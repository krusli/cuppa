import { Component, OnInit, OnDestroy } from '@angular/core';
import { GroupsService } from '../groups.service';
import { Group } from '../models/Group';
import { UserMap } from '../models/User';

interface GroupsAndUsers {
  groups: Group[];
  users: UserMap;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  title = 'cuppa';

  myGroups: GroupsAndUsers;

  constructor(private groupsService: GroupsService) { }

  ngOnInit() {
    this.groupsService.getGroups()
    .subscribe((data: GroupsAndUsers) => {
      this.myGroups = data;
    });
  }

  ngOnDestroy() {
    document.body.style.backgroundImage = 'none';
  }

}
