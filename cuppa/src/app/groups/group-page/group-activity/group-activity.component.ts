import { Component, OnInit } from '@angular/core';
import { GroupsService } from 'src/app/groups.service';
import { ActivatedRoute } from '@angular/router';

import { switchMap } from 'rxjs/operators';
import { Group } from 'src/app/models/Group';

@Component({
  selector: 'app-group-activity',
  templateUrl: './group-activity.component.html',
  styleUrls: ['./group-activity.component.scss']
})
export class GroupActivityComponent implements OnInit {

  group: Group;

  constructor(private groupsService: GroupsService, private route: ActivatedRoute) { }

  ngOnInit() {
    // TODO use NgRx Store, so parent and child can share data + react to events without
    // bulky event emitting and handling code.
    this.route.paramMap
      .pipe(
        switchMap(params => {
          const groupId = params.get('groupId');
          return this.groupsService.getGroup(groupId);
        })
      )
      .subscribe((group: Group) => {
        console.log(group);
        this.group = group;
      });
  }

}
