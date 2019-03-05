import { Component, OnInit, Input } from '@angular/core';

interface NavItem {
  name: string;
  link: string;
  routerLinkActiveOptions: any;
}

const navItems = [
  {
    name: 'Groups',
    link: '/groups',
    routerLinkActiveOptions: {exact: true}
  },
  {
    name: 'Communities',
    link: '/groups/communities',
    routerLinkActiveOptions: {}
  },
  {
    name: 'Friends',
    link: '/groups/friends',
    routerLinkActiveOptions: {}
  }
];

@Component({
  selector: 'app-tab-bar',
  templateUrl: './tab-bar.component.html',
  styleUrls: ['./tab-bar.component.scss']
})
export class TabBarComponent implements OnInit {

  @Input() navItems: NavItem[] = navItems;

  constructor() { }

  ngOnInit() {
  }

}
