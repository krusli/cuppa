import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-group-meetups',
  templateUrl: './group-meetups.component.html',
  styleUrls: ['./group-meetups.component.scss']
})
export class GroupMeetupsComponent implements OnInit {

  meetups: Observable<any>;

  constructor(private route: ActivatedRoute,
    // private groupsStore: Store<GroupsState>
    ) { }

  ngOnInit() {

    this.route.parent.paramMap
    .subscribe(params => {
      const groupId = params.get('groupId');
      // this.meetups = this.groupsStore.pipe(
        // select(getMeetups, { groupId })
      // );
    });

  }

}
