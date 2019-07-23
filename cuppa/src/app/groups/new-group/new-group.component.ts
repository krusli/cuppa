import { Component, OnInit } from '@angular/core';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { GroupsService } from 'src/app/groups.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.component.html',
  styleUrls: ['./new-group.component.scss']
})
export class NewGroupComponent implements OnInit {

  faChevronLeft = faChevronLeft;

  name: string;
  description: string;

  constructor(private groupsService: GroupsService, private router: Router) { }

  ngOnInit() {
  }

  newGroup() {
    if (!this.name) {
      alert('Please enter a name for the group.')
      return;
    }

    // TODO cleanup
    this.groupsService.newGroup({
      name: this.name,
      description: this.description
    })
    .subscribe(x => {
      console.log(x);

      // TODO this.router.navigate('../x.id', relative to this route)
      // TODO: add an action to add a new group + users in the new group
      // without replacing the existing items
      // groups.actions.ts and groups.reducer.ts
    });

  }

}
