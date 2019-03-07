import { Component, OnInit } from '@angular/core';
import { Group } from 'src/app/models/Group';
import { UserMap, User } from 'src/app/models/User';
import { GroupsService } from 'src/app/groups.service';
import { Store } from '@ngrx/store';
import { UserState } from 'src/app/state/user.state';
import { Observable, empty } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

interface GroupsAndUsers {
  groups: Group[];
  users: UserMap;
}

@Component({
  selector: 'app-groups-list',
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.scss']
})
export class GroupsListComponent implements OnInit {

  user: Observable<User>;
  myGroups: GroupsAndUsers;

  constructor(private groupsService: GroupsService, private store: Store<UserState>) { 
    this.user = store.select('user');
  }

  ngOnInit() {

    this.user.pipe(
      switchMap(x => {
        if (x) {
          return this.groupsService.getGroups()
        } else {
          return empty();
        }
      })
    )
    .subscribe((data: GroupsAndUsers) => {
      console.log(data);
      this.myGroups = data;
    });
  }

}
