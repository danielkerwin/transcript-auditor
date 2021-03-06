import { Action } from '@ngrx/store';
import { AssessmentModel } from './assessment.model';

export const QUERY = '[Assessment] Query';
export const SELECT = '[Assessment] Select';
export const FILTER = '[Assessment] Filter';

export const CREATE = '[Assessment] Create';
export const UPDATE = '[Assessment] Update';
export const DELETE = '[Assessment] Delete';

export const ADD_ALL = '[Assessment] Add all';
export const SUCCESS = '[Assessment] Success';
export const ERROR = '[Assessment] Error';

export const RESET = '[Assessment] Reset';

export class Query implements Action {
  readonly type = QUERY;
}
export class Select implements Action {
  readonly type = SELECT;
  constructor(public id: string) {}
}
export class Filter implements Action {
  readonly type = FILTER;
  constructor(
    public idsByConversation: string[],
    public idsByPlaylist: string[]
  ) {}
}

export class AddAll implements Action {
  readonly type = ADD_ALL;
  constructor(public assessments: AssessmentModel[]) {}
}
export class Success implements Action {
  readonly type = SUCCESS;
}
export class Error implements Action {
  readonly type = ERROR;
  constructor(public error: any) {}
}

export class Create implements Action {
  readonly type = CREATE;
}
export class Delete implements Action {
  readonly type = DELETE;
  constructor(public id: string) {}
}
export class Update implements Action {
  readonly type = UPDATE;
  constructor(public id: string, public changes: Partial<AssessmentModel>) {}
}

export class Reset implements Action {
  readonly type = RESET;
}

export type AssessmentActions =
  | Query
  | Select
  | Filter
  | Create
  | Update
  | Delete
  | AddAll
  | Success
  | Error
  | Reset;
