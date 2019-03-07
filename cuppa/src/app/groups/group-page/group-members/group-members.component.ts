import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { getMembers, getUsers } from 'src/app/reducers/groups.reducer';
import { ActivatedRoute } from '@angular/router';
import { GroupsState } from 'src/app/state/groups.state';

@Component({
  selector: 'app-group-members',
  templateUrl: './group-members.component.html',
  styleUrls: ['./group-members.component.scss']
})
export class GroupMembersComponent implements OnInit {


  members: Observable<any>;
  users: Observable<any>;

  constructor(private route: ActivatedRoute, private groupsStore: Store<GroupsState>) { }

  ngOnInit() {

    this.route.parent.paramMap
      .subscribe(params => {
        const groupId = params.get('groupId');

        this.members = this.groupsStore.pipe(
          select(getMembers, { groupId })
        );

        this.users = this.groupsStore.pipe(
          select(getUsers)
        );
      });

  }

}
