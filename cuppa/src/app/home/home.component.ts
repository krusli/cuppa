import { Component, OnInit, OnDestroy } from '@angular/core';
import { GroupsService } from '../groups.service';
import { Group } from '../models/Group';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  title = 'cuppa';

  groups: any;

  constructor(private groupsService: GroupsService) { }

  ngOnInit() {
    this.groupsService.getGroups()
    .subscribe((groups: any) => {
      this.groups = groups;
    });

  }

  ngOnDestroy() {
    document.body.style.backgroundImage = 'none';
  }

}
