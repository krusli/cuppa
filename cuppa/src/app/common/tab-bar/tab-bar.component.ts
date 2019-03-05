import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

interface NavItem {
  name: string;
  link: string;
  routerLinkActiveOptions: any;
  additionalTest: (x: string) => boolean; // for the 'active' class to be added
}

const navItems = [
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

@Component({
  selector: 'app-tab-bar',
  templateUrl: './tab-bar.component.html',
  styleUrls: ['./tab-bar.component.scss']
})
export class TabBarComponent implements OnInit {

  @Input() navItems: NavItem[] = navItems;

  constructor(private router: Router) { }

  ngOnInit() {
  }

}
