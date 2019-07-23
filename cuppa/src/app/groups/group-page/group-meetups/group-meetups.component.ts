import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Meetup } from 'src/app/models/Group';

import * as fromRoot from 'src/app/store/reducers';
import { MeetupsSelectors } from 'src/app/store/reducers/meetups.reducer';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-group-meetups',
  templateUrl: './group-meetups.component.html',
  styleUrls: ['./group-meetups.component.scss']
})
export class GroupMeetupsComponent implements OnInit {

  faPlus = faPlus;

  meetups$: Observable<Meetup[]>;

  constructor(
    private store: Store<fromRoot.State>,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.meetups$ = this.store.pipe(
      select(x => x.meetups), // TODO: use createFeatureSelector
      select(MeetupsSelectors.selectAll)
    );
  }

  meetupClicked(meetup: Meetup) {
    // https://github.com/angular/angular/issues/9957#issuecomment-441361269
    const groupId = this.route.snapshot.paramMap.get('groupId');
    // this.router.navigate(['/groups', groupId, {
    //   outlets: {
    //     primary: ['meetups', meetup._id],
    //     jumbotron: ['meetups', meetup._id]
    //   }
    // }]);
    this.router.navigate(['/meetups', meetup._id]);
  }

}
