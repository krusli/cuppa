import { Component, OnInit } from '@angular/core';
import { NavItem } from 'src/app/common/tab-bar/tab-bar.component';

@Component({
  selector: 'app-groups-tab-bar',
  templateUrl: './groups-tab-bar.component.html',
  styleUrls: ['./groups-tab-bar.component.scss']
})
export class GroupsTabBarComponent implements OnInit {

  navItems: NavItem[] = [
    {
      name: 'Groups',
      link: '/groups',
      routerLinkActiveOptions: {},
      additionalTest: (x: string) => {
        return x.startsWith('/groups') && !x.includes('communities') && !x.includes('friends');
      }
    },
    {
      name: 'Communities',
      link: '/groups/communities',
      routerLinkActiveOptions: {},
      additionalTest: () => false // noop
    },
    {
      name: 'Friends',
      link: '/groups/friends',
      routerLinkActiveOptions: {},
      additionalTest: () => false // noop
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
