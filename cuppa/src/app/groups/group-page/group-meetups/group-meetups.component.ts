import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Meetup } from 'src/app/models/Group';

import * as fromRoot from 'src/app/store/reducers';
import { MeetupsSelectors } from 'src/app/store/reducers/meetups.reducer';

@Component({
  selector: 'app-group-meetups',
  templateUrl: './group-meetups.component.html',
  styleUrls: ['./group-meetups.component.scss']
})
export class GroupMeetupsComponent implements OnInit {

  meetups$: Observable<Meetup[]>;

  constructor(
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit() {
    this.meetups$ = this.store.pipe(
      select(x => x.meetups), // TODO: use createFeatureSelector
      select(MeetupsSelectors.selectAll)
    );
  }

}
