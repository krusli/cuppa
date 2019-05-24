import { Component, OnInit } from '@angular/core';
import { GroupsAndUsers, Group } from 'src/app/models/Group';
import { User } from 'src/app/models/User';
import { GroupsService } from 'src/app/groups.service';
import { Store, select } from '@ngrx/store';
import { Observable, empty } from 'rxjs';

import * as fromRoot from 'src/app/store/reducers';
import { GroupsSelectors } from 'src/app/store/reducers/groups.reducer';
import { Dictionary } from '@ngrx/entity';
import { UsersSelectors } from 'src/app/store/reducers/users.reducer';

@Component({
  selector: 'app-groups-list',
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.scss']
})
export class GroupsListComponent implements OnInit {

  users$: Observable<Dictionary<User>>;
  groups$: Observable<Group[]>;

  constructor(private groupsService: GroupsService,
              private store: Store<fromRoot.State>) {
    this.groups$ = store.pipe(
      select('groups'),
      select(GroupsSelectors.selectAll)
    )

    this.users$ = store.pipe(
      select('users'),
      select(UsersSelectors.selectEntities)
    )
  }

  ngOnInit() { }

}
