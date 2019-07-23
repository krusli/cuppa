import { Component, OnInit, OnDestroy } from '@angular/core';
import { GroupsService } from 'src/app/groups.service';
import { ActivatedRoute } from '@angular/router';

import * as fromRoot from 'src/app/store/reducers';

import { switchMap } from 'rxjs/operators';
import { Group } from 'src/app/models/Group';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Dictionary } from '@ngrx/entity';
import { User } from 'src/app/models/User';
import { GroupsSelectors } from 'src/app/store/reducers/groups.reducer';
import { UsersSelectors } from 'src/app/store/reducers/users.reducer';

type Action = 'Created' | 'Joined';

@Component({
  selector: 'app-group-activity',
  templateUrl: './group-activity.component.html',
  styleUrls: ['./group-activity.component.scss']
})
export class GroupActivityComponent implements OnInit, OnDestroy {

  // group: Group;
  // users: any; // k -> v // TODO

  group$: Observable<Group>;
  users$: Observable<Dictionary<User>>;

  now: Date = new Date();
  nowTimer: any

  constructor(private groupsService: GroupsService,
              private route: ActivatedRoute,
              private store: Store<fromRoot.State>) { }

  ngOnInit() {

    const groupId = this.route.snapshot.paramMap.get('groupId');

    this.group$ = this.store.pipe(
      select('groups'),
      select(GroupsSelectors.selectEntities),
      select(x => x[groupId])
    );

    this.users$ = this.store.pipe(
      select('users'),
      select(UsersSelectors.selectEntities)
    );


    this.nowTimer = setInterval(() => {
      this.now = new Date();
    }, 60000);  // update every minute
  }

  ngOnDestroy() {

  }

  getDescriptionForAction(action: Action) {

    switch (action) {
      case 'Created':
        return 'Created the group';

      case 'Joined':
        return 'Joined the group';

      default:
        return '';
    }

  }

  toDate(dateString) {
    return new Date(dateString);
  }

  differenceInSeconds(date1, date2) {
    return (date1 - date2) / 1000;
  }

}
