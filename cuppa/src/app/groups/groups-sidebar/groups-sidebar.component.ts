import { Component, OnInit } from '@angular/core';

import { Group } from 'src/app/models/Group';
import { UserMap } from 'src/app/models/User';
import { GroupsService } from 'src/app/groups.service';
interface GroupsAndUsers {
  groups: Group[];
  users: UserMap;
}

@Component({
  selector: 'app-groups-sidebar',
  templateUrl: './groups-sidebar.component.html',
  styleUrls: ['./groups-sidebar.component.scss']
})
export class GroupsSidebarComponent implements OnInit {

  myGroups: GroupsAndUsers;

  constructor(private groupsService: GroupsService) { }

  ngOnInit() {
    this.groupsService.getGroups()
      .subscribe((data: GroupsAndUsers) => {
        this.myGroups = data;
      });
  }

}
