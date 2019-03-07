import { Component, OnInit, OnDestroy } from '@angular/core';
import { GroupsService } from 'src/app/groups.service';
import { ActivatedRoute } from '@angular/router';

import { switchMap } from 'rxjs/operators';
import { Group } from 'src/app/models/Group';

type Action = 'Created' | 'Joined';

@Component({
  selector: 'app-group-activity',
  templateUrl: './group-activity.component.html',
  styleUrls: ['./group-activity.component.scss']
})
export class GroupActivityComponent implements OnInit, OnDestroy {

  group: Group;
  users: any; // k -> v // TODO

  now: Date = new Date();
  nowTimer: any

  constructor(private groupsService: GroupsService, private route: ActivatedRoute) { }

  ngOnInit() {
    // TODO use NgRx Store, so parent and child can share data + react to events without
    // bulky event emitting and handling code.
    this.route.paramMap
      .pipe(
        switchMap(params => {
          const groupId = params.get('groupId');
          return this.groupsService.getGroup(groupId);
        })
      )
      .subscribe((groupAndUsers: any) => {
        this.group = groupAndUsers.group;
        this.users = groupAndUsers.users;
      });

    this.nowTimer = setInterval(() => {
      this.now = new Date();
    }, 60000);
  }

  ngOnDestroy() {

  }

  getDescriptionForAction(action: Action) {

    switch (action) {
      case 'Created':
        return 'Created the group'
      
      case 'Joined':
        return 'Joined the group'
      
      default:
        return ''
    }

  }

  toDate(dateString) {
    return new Date(dateString);
  }

  differenceInSeconds(date1, date2) {
    return (date1 - date2) / 1000;
  }

}
