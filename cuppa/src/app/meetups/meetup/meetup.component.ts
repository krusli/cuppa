import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';

import * as fromRoot from 'src/app/store/reducers';
import { Observable } from 'rxjs';
import { Meetup } from 'src/app/models/Group';
import { MeetupsSelectors } from 'src/app/store/reducers/meetups.reducer';

@Component({
  selector: 'app-meetup',
  templateUrl: './meetup.component.html',
  styleUrls: ['./meetup.component.css']
})
export class MeetupComponent implements OnInit {

  meetupId: string;

  meetup$: Observable<Meetup>;

  constructor(private route: ActivatedRoute, private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.meetupId = this.route.snapshot.paramMap.get('meetupId');

    this.meetup$ = this.store.pipe(
      select(x => x.meetups),
      select(MeetupsSelectors.selectEntities),
      select(dict => dict[this.meetupId])
    );
  }

}
