import { Component, OnInit } from '@angular/core';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { GroupsService } from 'src/app/groups.service';

@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.component.html',
  styleUrls: ['./new-group.component.scss']
})
export class NewGroupComponent implements OnInit {

  faChevronLeft = faChevronLeft;

  name: string;
  description: string;
  
  constructor(private groupsService: GroupsService) { }

  ngOnInit() {
  }

  newGroup() {
    if (!this.name) {
      console.log('TODO show alert');
      return;
    }

    this.groupsService.newGroup({
      name: this.name,
      description: this.description
    })
    .subscribe(x => {
      console.log(x);
    });

  }

}
