import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

export interface NavItem {
  name: string;
  link: string;
  routerLinkActiveOptions: any;
  additionalTest: (x: string) => boolean; // for the 'active' class to be added
}

export class NavItemImpl implements NavItem {
  name: string;
  link: string;
  routerLinkActiveOptions: any;
  additionalTest: (x: string) => boolean;

  constructor(name: string,
              link: string,
              routerLinkActiveOptions: any = {},
              additionalTest: (x: string) => boolean =
                // default: no-op
                () => false) {
    this.name = name;
    this.link = link;
    this.routerLinkActiveOptions = routerLinkActiveOptions;
    this.additionalTest = additionalTest;
  }

}

@Component({
  selector: 'app-tab-bar',
  templateUrl: './tab-bar.component.html',
  styleUrls: ['./tab-bar.component.scss']
})
export class TabBarComponent implements OnInit {

  @Input() navItems: NavItem[];
  @Input() alignLeft = false;

  constructor(private router: Router) { }

  ngOnInit() {
  }

}
