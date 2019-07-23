import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';

import * as fromRoot from 'src/app/store/reducers';
import { Observable } from 'rxjs';
import { Meetup } from 'src/app/models/Group';
import { MeetupsSelectors } from 'src/app/store/reducers/meetups.reducer';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { LoadMeetups, LoadMeetup } from 'src/app/store/actions/meetups.actions';
import { NavItem, NavItemImpl } from 'src/app/common/tab-bar/tab-bar.component';

@Component({
  selector: 'app-meetup',
  templateUrl: './meetup.component.html',
  styleUrls: ['./meetup.component.css']
})
export class MeetupComponent implements OnInit {

  faArrowLeft = faArrowLeft;

  meetupId: string;

  meetup$: Observable<Meetup>;

  navItems: NavItem[] = [];

  constructor(private route: ActivatedRoute, private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.meetupId = this.route.snapshot.paramMap.get('meetupId');
    this.updateNavItems(this.meetupId);

    this.store.dispatch(new LoadMeetup({ meetupId: this.meetupId }));

    this.meetup$ = this.store.pipe(
      select(x => x.meetups),
      select(MeetupsSelectors.selectEntities),
      select(dict => dict[this.meetupId])
    );

    // TODO: dispatch LoadMeetups if the Store is empty
  }

  updateNavItems(meetupId: string) {
    this.navItems = [
      new NavItemImpl('Meetup', `/meetups/${meetupId}`, { exact: true }),
      new NavItemImpl('Events', `/meetups/${meetupId}/events`),
      new NavItemImpl('Teams', `/meetups/${meetupId}/teams`),
      new NavItemImpl('Attendees', `/meetups/${meetupId}/attendees`)
    ];
  }

}
