import { Component, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  faPlus = faPlus

  // TODO private router
  constructor(public router: Router) { }

  ngOnInit() {
  }

  showAsContainer() {
    return this.router.url == '/groups' || this.router.url == '/groups/new';
  }

}
