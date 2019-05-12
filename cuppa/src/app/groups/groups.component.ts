import { Component, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromRoot from 'src/app/store/reducers';
import { LoadGroups } from '../store/actions/groups.actions';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  faPlus = faPlus

  // TODO private router
  constructor(public router: Router, public store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.store.dispatch(new LoadGroups());
  }

  showAsContainer() {
    return this.router.url == '/groups' || this.router.url == '/groups/new';
  }

}
