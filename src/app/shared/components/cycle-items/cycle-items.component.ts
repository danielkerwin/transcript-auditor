import { Component, OnInit, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'app-cycle-items',
  templateUrl: './cycle-items.component.html',
  styleUrls: ['./cycle-items.component.css']
})
export class CycleItemsComponent implements OnInit {
  @HostBinding('class') class = 'col-auto';
  @Input() type: string;

  constructor() { }

  /**
   * toggle through items (true is forward, false is back)
   * @param {boolean} next
   */
  cycleItem(next: boolean) {
    // // select first conversation if none selected
    // if (
    //   !this.apiConversation ||
    //   (!this.apiConversation.info && this.apiConversations.length > 0)
    // ) {
    //   this.apiConversation = this.apiConversations[0];
    //   return;
    // }

    // // find current index
    // const index = this.apiConversations.findIndex(
    //   conversation =>
    //     conversation.info.conversationId ===
    //     this.apiConversation.info.conversationId
    // );

    // // find new index
    // if (index !== -1) {
    //   const length = this.apiConversations.length;
    //   let targetIndex;
    //   if (next && index + 1 === length) {
    //     targetIndex = 0;
    //   } else if (!next && index - 1 === -1) {
    //     targetIndex = length - 1;
    //   } else {
    //     targetIndex = next ? index + 1 : index - 1;
    //   }

    //   // set new conversation
    //   this.apiConversation = this.apiConversations[targetIndex];
    // } else {
    //   this.apiConversation = this.apiConversations[0];
    // }
  }


  ngOnInit() {
  }

}