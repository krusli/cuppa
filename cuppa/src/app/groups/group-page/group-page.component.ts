import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupsService } from 'src/app/groups.service';

import { switchMap } from 'rxjs/operators';
import { Group, GroupsAndUsers } from 'src/app/models/Group';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { NavItem, NavItemImpl } from 'src/app/common/tab-bar/tab-bar.component';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GroupsState } from 'src/app/state/groups.state';

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

    this.groupsAndUsers = groupsStore.select('groups');
  }

  ngOnInit() {
    this.groupsStore
    .pipe(
      switchMap(x => this.route.paramMap),
      switchMap(params => {
        const groupId = params.get('groupId');
        return this.groupsService.getGroup(groupId);
      })
    )
    .subscribe((groupAndUsers: any) => {
      this.group = groupAndUsers.group;
      this.updateNavItems();
    });
  }

  updateNavItems() {
    this.navItems = [
      new NavItemImpl('Activity', `/groups/view/${this.group._id}`, { exact: true }),
      new NavItemImpl('Meetups', `/groups/view/${this.group._id}/meetups`),
      new NavItemImpl('Members', `/groups/view/${this.group._id}/members`)
    ];
  }

}
