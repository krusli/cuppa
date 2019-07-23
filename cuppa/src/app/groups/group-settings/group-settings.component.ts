import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

import * as fromRoot from 'src/app/store/reducers';
import { Observable, Subscription } from 'rxjs';
import { Group } from 'src/app/models/Group';
import { ActivatedRoute } from '@angular/router';
import { GroupsSelectors } from 'src/app/store/reducers/groups.reducer';

@Component({
  selector: 'app-group-settings',
  templateUrl: './group-settings.component.html',
  styleUrls: ['./group-settings.component.css']
})
export class GroupSettingsComponent implements OnInit {

  groupId: string;
  group$: Observable<Group>;

  subs: Subscription[] = [];

  constructor(private store: Store<fromRoot.State>, private route: ActivatedRoute) { }

  ngOnInit() {

    this.subs.push(
      this.route.paramMap.subscribe(paramMap => {
        this.groupId = paramMap.get('groupId');

        this.group$ = this.store.pipe(
          select('groups'), // TODO refactor to createFeatureSelector
          select(GroupsSelectors.selectEntities),
          select(groups => groups[this.groupId])
        );
      })
    );

  }

}
