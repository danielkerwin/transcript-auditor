import { Injectable } from '@angular/core';
import { AfUser, AfConversationData, AfConversation } from '../interfaces/interfaces';

import { take } from 'rxjs/operators';

// 3rd party
import * as papaparse from 'papaparse';
import * as _ from 'lodash';
import * as FileSaver from 'file-saver';
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators/switchMap';

@Injectable()
export class ExportService {
  constructor() {}

  /**
   * takes 1 users data and exports to csv
   * @param {AfUser} data
   */
  downloadNotes(data: AfUser) {
    if (!data || !data.conversations) {
      return;
    }
    const keys: string[] = Object.keys(data.conversations);
    const notes: AfConversationData[] = keys.map(key => data.conversations[key]);
    this.downloadCsvFile(notes, 'Notes');
  }

  /**
   * takes all users data and exports to csv
   * @param {AfUser[]} data
   */
  downloadAllNotes(data: AfUser[]) {
    if (!data.length) {
      return;
    }
    const allData: AfConversationData[] = [];
    const userData = data.forEach(user => {
      if (user.conversations) {
        Object.keys(user.conversations).forEach(key => {
          allData.push(user.conversations[key]);
        });
      }
    });
    this.downloadCsvFile(allData, 'AllNotes');
  }

  /**
   * export data to csv
   * @param {any[]} data
   */
  downloadCsvFile(data: any[], prefix: string = 'Data'): void {
    const csv = papaparse.unparse(data);
    const blob = new Blob([csv], { type: 'text/csv' });
    const date = new Date().toISOString().slice(0, 19);
    FileSaver.saveAs(blob, prefix + '-' + date + '.csv');
  }
}
