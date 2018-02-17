import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, switchMap, first, catchError } from 'rxjs/operators';

import * as AfLoginActions from './af-login.actions';
import { AfLoginState } from './af-login.model';

import {
  AngularFirestore,
  AngularFirestoreCollection,
} from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class AfLoginEffects {
  @Effect()
  getUser$: Observable<any> = this.actions$
    .ofType<AfLoginActions.GetUser>(AfLoginActions.GET_USER)
    .pipe(
      switchMap(action => this.afAuth.authState),
      map(auth => {
        if (auth) {
          const user = new AfLoginState(auth.uid, auth.displayName, auth.email);
          return new AfLoginActions.Authenticated(user);
        }
        return new AfLoginActions.NotAuthenticated();
      })
    );

  @Effect()
  authenticated$: Observable<any> = this.actions$
    .ofType<AfLoginActions.Authenticated>(AfLoginActions.AUTHENTICATED)
    .pipe(
      map(action => {
        this.router.navigate(['/app']);
        return new AfLoginActions.CreateUser(action.user);
      })
    );

  @Effect()
  createUser$: Observable<any> = this.actions$
    .ofType<AfLoginActions.CreateUser>(AfLoginActions.CREATE_USER)
    .pipe(
      switchMap(action => {
        const { uid, email, displayName } = action.user;
        const docRef = this.afStore.doc(`users/${uid}`);
        return docRef.valueChanges().pipe(
          first(),
          switchMap(async user => {
            if (user) {
              return new AfLoginActions.Success();
            }
            await docRef.set({ ...user, createdAt: new Date() });
            return new AfLoginActions.Success();
          }),
          catchError(error => [new AfLoginActions.Error(error)])
        );
      })
    );

  @Effect({ dispatch: false })
  notAuthenticated$: Observable<any> = this.actions$
    .ofType<AfLoginActions.NotAuthenticated>(AfLoginActions.NOT_AUTHENTICATED)
    .pipe(
      switchMap(action => {
        this.router.navigate(['/login']);
        return Observable.of(null);
      })
    );

  @Effect()
  googleLogin$: Observable<any> = this.actions$
    .ofType<AfLoginActions.GoogleLogin>(AfLoginActions.GOOGLE_LOGIN)
    .pipe(
      switchMap(action => Observable.fromPromise(this.googleLogin())),
      map(auth => new AfLoginActions.GetUser())
    );

  @Effect()
  logout$: Observable<any> = this.actions$
    .ofType<AfLoginActions.Logout>(AfLoginActions.LOGOUT)
    .pipe(
      switchMap(action => Observable.fromPromise(this.logout())),
      map(auth => new AfLoginActions.GetUser())
    );

  constructor(
    private actions$: Actions,
    public afStore: AngularFirestore,
    public afAuth: AngularFireAuth,
    private router: Router
  ) {}

  googleLogin(): Promise<any> {
    return this.afAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    );
  }

  logout(): Promise<any> {
    return this.afAuth.auth.signOut();
  }
}