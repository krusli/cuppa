import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';

import * as fromRoot from 'src/app/store/reducers';
import { Observable, Subscription } from 'rxjs';
import { Meetup } from 'src/app/models/Group';
import { MeetupsSelectors } from 'src/app/store/reducers/meetups.reducer';

@Component({
  selector: 'app-meetup-jumbotron',
  templateUrl: './meetup-jumbotron.component.html',
  styleUrls: ['./meetup-jumbotron.component.css']
})
export class MeetupJumbotronComponent implements OnInit, OnDestroy  {

  meetupId: string;

  meetup$: Observable<Meetup>;
  subscriptions: Subscription[] = [];

  constructor(private route: ActivatedRoute, private store: Store<fromRoot.State>) { }

  ngOnInit() {
    console.log(this.route.snapshot.paramMap);

    this.subscriptions.push(
      this.route.paramMap.subscribe(paramMap => {
        this.meetupId = paramMap.get('meetupId');
        this.meetup$ = this.store.pipe(
          select('meetups'),
          select(MeetupsSelectors.selectEntities),
          select(meetups => meetups[this.meetupId])
        );
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.map(s => s.unsubscribe());
  }

}
