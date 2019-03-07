import { Component, OnInit, OnDestroy } from '@angular/core';

import { GroupsAndUsers } from 'src/app/models/Group';
import { GroupsService } from 'src/app/groups.service';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { GroupsState } from 'src/app/state/groups.state';


@Component({
  selector: 'app-groups-sidebar',
  templateUrl: './groups-sidebar.component.html',
  styleUrls: ['./groups-sidebar.component.scss']
})
export class GroupsSidebarComponent implements OnInit, OnDestroy {

  groups: Observable<GroupsAndUsers>;
  myGroups: GroupsAndUsers;

  subscription: Subscription;

  constructor(private groupsService: GroupsService, private groupsStore: Store<GroupsState>) {
    this.groups = groupsStore.select('groups');
  }

  ngOnInit() {
    this.subscription = this.groups.subscribe((data: GroupsAndUsers) => {
      this.myGroups = data;
    });
  }

  getLink(groupId: string) {
    return `/groups/view/${groupId}`;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
