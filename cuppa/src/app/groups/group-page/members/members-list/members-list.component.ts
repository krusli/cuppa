import { Component, OnInit } from '@angular/core';

import * as fromRoot from 'src/app/store/reducers';
import { Store, select } from '@ngrx/store';
import { Group } from 'src/app/models/Group';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { GroupsSelectors } from 'src/app/store/reducers/groups.reducer';
import { UsersSelectors } from 'src/app/store/reducers/users.reducer';
import { Dictionary } from '@ngrx/entity';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.css']
})
export class MembersListComponent implements OnInit {

  group$: Observable<Group>;
  users$: Observable<Dictionary<User>>;

  constructor(
    private store: Store<fromRoot.State>,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const map = this.route.snapshot.paramMap;

    const groupId = map.get('groupId');

    this.group$ = this.store.pipe(
      select('groups'),
      select(GroupsSelectors.selectEntities),
      select(x => x[groupId])
    )
    this.group$.subscribe(x => console.log(x));

    this.users$ = this.store.pipe(
      select('users'),
      select(UsersSelectors.selectEntities)
    );
  }

}
