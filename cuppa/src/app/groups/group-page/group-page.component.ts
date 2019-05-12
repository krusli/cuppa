import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Group, GroupsAndUsers } from 'src/app/models/Group';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { NavItem, NavItemImpl } from 'src/app/common/tab-bar/tab-bar.component';
import { Observable } from 'rxjs';

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

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    /* Assumption: Groups store already populated by parent Groups Component (routing parent) */
    const groupId = this.route.snapshot.paramMap.get('groupId');
    this.updateNavItems(groupId);
  }

  updateNavItems(groupId: string) {
    this.navItems = [
      new NavItemImpl('Activity', `/groups/view/${groupId}`, { exact: true }),
      new NavItemImpl('Meetups', `/groups/view/${groupId}/meetups`),
      new NavItemImpl('Members', `/groups/view/${groupId}/members`)
    ];
  }

}
