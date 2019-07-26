import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Meetup, Group } from 'src/app/models/Group';

import * as fromRoot from 'src/app/store/reducers';
import { MeetupsSelectors } from 'src/app/store/reducers/meetups.reducer';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/User';
import { GroupsSelectors } from 'src/app/store/reducers/groups.reducer';
import { UsersSelectors } from 'src/app/store/reducers/users.reducer';
import { NewMeetup } from 'src/app/store/actions/meetups.actions';

@Component({
  selector: 'app-group-meetups',
  templateUrl: './group-meetups.component.html',
  styleUrls: ['./group-meetups.component.scss']
})
export class GroupMeetupsComponent implements OnInit {

  faPlus = faPlus;

  accountId: string;
  groupId: string;
  account$: Observable<User>;
  group$: Observable<Group>;

  meetups$: Observable<Meetup[]>;

  meetupTemp: Meetup;

  constructor(
    private store: Store<fromRoot.State>,
    private route: ActivatedRoute,
    private router: Router,
    public modal: NgbModal
  ) { }

  ngOnInit() {
    this.meetups$ = this.store.pipe(
      select(x => x.meetups), // TODO: use createFeatureSelector
      select(MeetupsSelectors.selectAll)
    );

    this.route.paramMap.subscribe(paramMap => {
      this.group$ = this.store.pipe(
        select(s => s.groups),
        select(GroupsSelectors.selectEntities),
        select(m => m[paramMap.get('groupId')])
      );

      this.account$ = this.store.pipe(
        select('auth'),
        select('user')
      );
    })

  }

  newMeetup(group: Group, account: User) {
    this.meetupTemp = {
      name: undefined,
      group: group._id,
      owner: account._id
    };
  }

  saveMeetup() {
    this.store.dispatch(new NewMeetup({ meetup: this.meetupTemp }));
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
