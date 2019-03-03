import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  // max no of items to display
  LIMIT = 3;
  LIMIT_ATTENDEE = 2;

  @Input() group: any = {
    name: 'Secret Society BLANKET',
    members: ['TheLosser', 'Eldcerust', 'krusli', 'ApooDx'],
    meetups: [
      {
        dateFormatted: '2 Mar',
        timeFormatted: '15:00',
        venue: 'Krossroadz',
        attending: ['krusli', 'TheLosser']
      },

      {
        dateFormatted: '10 Mar',
        timeFormatted: '15:00',
        venue: 'Krossroadz',
        attending: ['krusli', 'TheLosser', 'ApooDx']
      }
    ]
  }

  constructor() { }

  ngOnInit() {
  }

}
