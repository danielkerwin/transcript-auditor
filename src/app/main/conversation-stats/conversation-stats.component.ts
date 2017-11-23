import { Component, OnChanges, Input } from '@angular/core';
import { ApiConversationHistoryRecord } from '../../shared/interfaces/interfaces';

// 3rd party
import * as _ from 'lodash';

@Component({
  selector: 'app-conversation-stats',
  templateUrl: './conversation-stats.component.html',
  styleUrls: ['./conversation-stats.component.css']
})
export class ConversationStatsComponent implements OnChanges {
  @Input() conversation: ApiConversationHistoryRecord;

  metrics: {
    value: any;
    name: any;
  }[] = [];

  constructor() {}

  /**
   * Calculates response times between all messages
   * @return {number}
   */
  calculateResponseTimes(): number {
    if (!this.conversation) {
      return 0;
    }
    let time = 0;
    this.conversation.messageRecords.forEach((msg, idx, arr) => {
        time += idx > 0 ? msg.timeL - arr[idx - 1].timeL : 0;
    });
    return (time / this.conversation.messageRecords.length) / 1000 / 3600;
  }

  /**
   * Calculate first time to response
   */
  calculateFirstResponseTime(): number {
    if (!this.conversation) {
      return 0;
    }
    let sentBy: string;
    let time: number;
    for (const msg of this.conversation.messageRecords) {
      if (!sentBy) {
        sentBy = msg.sentBy;
        time = msg.timeL;
      }
      if (sentBy !== msg.sentBy) {
        return (msg.timeL - time) / 1000 / 60;
      }
    }
  }


  ngOnChanges() {
  }
}