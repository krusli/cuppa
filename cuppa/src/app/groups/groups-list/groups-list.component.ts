import { Component, OnInit } from '@angular/core';
import { GroupsAndUsers } from 'src/app/models/Group';
import { UserMap, User } from 'src/app/models/User';
import { GroupsService } from 'src/app/groups.service';
import { Store } from '@ngrx/store';
import { Observable, empty } from 'rxjs';

@Component({
  selector: 'app-groups-list',
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.scss']
})
export class GroupsListComponent implements OnInit {

  user: Observable<User>;
  groups: Observable<GroupsAndUsers>;

  constructor(private groupsService: GroupsService,
    // private groupsStore: Store<GroupsState>
    ) {
    // this.groups = groupsStore.select('groups');
  }

  ngOnInit() { }

}
