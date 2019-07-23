import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import * as fromRoot from 'src/app/store/reducers';


import { Group } from 'src/app/models/Group';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { NavItem, NavItemImpl } from 'src/app/common/tab-bar/tab-bar.component';
import { Observable, Subscription, Subject } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { GroupsSelectors } from 'src/app/store/reducers/groups.reducer';
import { LoadMeetups } from 'src/app/store/actions/meetups.actions';

@Component({
  selector: 'app-group-page',
  templateUrl: './group-page.component.html',
  styleUrls: ['./group-page.component.scss']
})
export class GroupPageComponent implements OnInit, OnDestroy {

  faChevronLeft = faChevronLeft;

  navItems: NavItem[];

  // group: Group;
  group$: Observable<Group>;
  subs: Subscription[] = [];

  constructor(private route: ActivatedRoute, private store: Store<fromRoot.State>) {
  }

  ngOnInit() {
    /* Assumption: Groups store already populated by parent Groups Component (routing parent) */

    this.subs.push(
      this.route.paramMap.subscribe(paramMap => {
        const groupId = paramMap.get('groupId');
        this.updateNavItems(groupId);

        this.group$ = this.store.pipe(
          select('groups'),
          select(GroupsSelectors.selectEntities),
          select(x => x[groupId])
        );
      })
    );

    this.subs.push(
      this.group$.subscribe(
        group => {
          if (!group) {  // NOTE: group can be undefined on initial load
            return;
          }
          return this.store.dispatch(new LoadMeetups(group.meetups))
        }
      )
    );
  }

  ngOnDestroy() {
    this.subs.map(s => s.unsubscribe());
  }

  updateNavItems(groupId: string) {
    this.navItems = [
      new NavItemImpl('Activity', `/groups/${groupId}`, { exact: true }),
      new NavItemImpl('Meetups', `/groups/${groupId}/meetups`),
      new NavItemImpl('Members', `/groups/${groupId}/members`),
      new NavItemImpl('Settings', `/groups/${groupId}/settings`)
    ];
  }

}
