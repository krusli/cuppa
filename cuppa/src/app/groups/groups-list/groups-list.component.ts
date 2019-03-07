import { Component, OnInit } from '@angular/core';
import { GroupsAndUsers } from 'src/app/models/Group';
import { UserMap, User } from 'src/app/models/User';
import { GroupsService } from 'src/app/groups.service';
import { Store } from '@ngrx/store';
import { UserState } from 'src/app/state/user.state';
import { Observable, empty } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { GroupsState } from 'src/app/state/groups.state';
import { AddGroupsAndUsers } from 'src/app/actions/groups.actions';

@Component({
  selector: 'app-groups-list',
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.scss']
})
export class GroupsListComponent implements OnInit {

  user: Observable<User>;
  groups: Observable<GroupsAndUsers>;

  constructor(private groupsService: GroupsService, private groupsStore: Store<GroupsState>) { 
    this.groups = groupsStore.select('groups');
  }

  ngOnInit() { }

}
