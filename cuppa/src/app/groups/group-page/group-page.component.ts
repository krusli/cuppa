import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupsService } from 'src/app/groups.service';

import { switchMap } from 'rxjs/operators';
import { Group, GroupsAndUsers } from 'src/app/models/Group';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { NavItem, NavItemImpl } from 'src/app/common/tab-bar/tab-bar.component';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GroupsState } from 'src/app/state/groups.state';
import { getGroupAndUsers } from 'src/app/reducers/groups.reducer';

@Component({
  selector: 'app-group-page',
  templateUrl: './group-page.component.html',
  styleUrls: ['./group-page.component.scss']
})
export class GroupPageComponent implements OnInit {

  faChevronLeft = faChevronLeft;

  navItems: NavItem[];

  groupsAndUsers: Observable<GroupsAndUsers>;
  group: Group;

  constructor(private route: ActivatedRoute, 
              private groupsService: GroupsService, 
              private groupsStore: Store<GroupsState>) { 

  }

  ngOnInit() {

    this.route.paramMap
    .subscribe(params => {
      const groupId = params.get('groupId');
      this.updateNavItems(groupId);

      this.groupsAndUsers = this.groupsStore.pipe(
        select(getGroupAndUsers, { groupId })
      )

      this.groupsAndUsers.subscribe((data: GroupsAndUsers) => {
        this.group = data.groups[0];
      })

    })


  }

  updateNavItems(groupId: string) {
    this.navItems = [
      new NavItemImpl('Activity', `/groups/view/${groupId}`, { exact: true }),
      new NavItemImpl('Meetups', `/groups/view/${groupId}/meetups`),
      new NavItemImpl('Members', `/groups/view/${groupId}/members`)
    ];
  }

}
