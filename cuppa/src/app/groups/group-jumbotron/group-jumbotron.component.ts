import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromRoot from 'src/app/store/reducers';
import { Observable } from 'rxjs';
import { Group } from 'src/app/models/Group';
import { GroupsSelectors } from 'src/app/store/reducers/groups.reducer';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-group-jumbotron',
  templateUrl: './group-jumbotron.component.html',
  styleUrls: ['./group-jumbotron.component.scss']
})
export class GroupJumbotronComponent implements OnInit {

  groupId: string;
  group$: Observable<Group>;

  constructor(private store: Store<fromRoot.State>, private route: ActivatedRoute) { }

  ngOnInit() {
    this.groupId = this.route.snapshot.paramMap.get('groupId');

    this.group$ = this.store.pipe(
      select(store => store.groups),
      select(GroupsSelectors.selectEntities),
      select(dict => dict[this.groupId])
    );
  }

}
