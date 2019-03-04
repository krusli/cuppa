import { Component, OnInit, Input } from '@angular/core';
import { Group } from 'src/app/models/Group';
import { UserMap } from 'src/app/models/User';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  // max no of items to display
  LIMIT = 3;
  LIMIT_ATTENDEE = 2;

  @Input() group: Group;
  @Input() users: UserMap;

  constructor() { }

  ngOnInit() {
  }

}
