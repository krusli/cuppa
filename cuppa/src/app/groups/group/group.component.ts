import { Component, OnInit, Input } from '@angular/core';
import { Group } from 'src/app/models/Group';

interface GroupAndUsers {
  groups: Group[];
  users: any;
}

const sampleGroup: Group = {
  members: [
    '5c7a4a5a5150300593314cf2',
    '5c7a4a255150300593314cf1'
  ],
  _id: '5c7a4aa0a0647e05ab0d1ffb',
  name: 'Secret Society BLANKET',
  description: 'Someday we shall go camping too.',
  owner: '5c7a4a5a5150300593314cf2',
  createdOn: new Date('2019-03-02T09:19:28.228Z'),
  __v: 1,
  roles: [],
  meetups: [
    {
      attendees: [],
      _id: '5c7cd9543aa5b87d7ffc7ddb',
      name: 'Test Meetup',
      group: '5c7a4aa0a0647e05ab0d1ffb',
      owner: '5c7a4a255150300593314cf1',
      createdOn: '2019-03-04T07:52:52.308Z',
      events: [],
      teams: [],
      roles: [],
      __v: 0
    }
  ]
};

const sampleUsers = {
  '5c7a4a255150300593314cf1': {
    _id: '5c7a4a255150300593314cf1',
    name: 'Kenneth',
    username: 'krusli',
    __v: 0
  },
  '5c7a4a5a5150300593314cf2': {
    _id: '5c7a4a5a5150300593314cf2',
    name: 'Gana',
    username: 'TheLosser',
    __v: 0
  }
};


@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  // max no of items to display
  LIMIT = 3;
  LIMIT_ATTENDEE = 2;

  @Input() group = sampleGroup;
  @Input() users = sampleUsers;

  constructor() { }

  ngOnInit() {
  }

}
