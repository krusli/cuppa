import { Component, OnInit, OnDestroy } from '@angular/core';

import { GroupsAndUsers, Group } from 'src/app/models/Group';
import { GroupsService } from 'src/app/groups.service';
import { Observable, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromRoot from 'src/app/store/reducers';
import { LoadGroups } from 'src/app/store/actions/groups.actions';
import { Dictionary } from '@ngrx/entity';
import { User } from 'src/app/models/User';
import { GroupsSelectors } from 'src/app/store/reducers/groups.reducer';

@Component({
  selector: 'app-groups-sidebar',
  templateUrl: './groups-sidebar.component.html',
  styleUrls: ['./groups-sidebar.component.scss']
})
export class GroupsSidebarComponent implements OnInit {

  groups$: Observable<Group[]>;

  subscription: Subscription;

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.groups$ = this.store.pipe(
      select('groups'),
      select(GroupsSelectors.selectAll)
    );
  }

  getLink(groupId: string) {
    return `/groups/${groupId}`;
  }

}
