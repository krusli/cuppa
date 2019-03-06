import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupsService } from 'src/app/groups.service';

import { switchMap } from 'rxjs/operators';
import { Group } from 'src/app/models/Group';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { NavItem, NavItemImpl } from 'src/app/common/tab-bar/tab-bar.component';

@Component({
  selector: 'app-group-page',
  templateUrl: './group-page.component.html',
  styleUrls: ['./group-page.component.scss']
})
export class GroupPageComponent implements OnInit {

  faChevronLeft = faChevronLeft;

  navItems: NavItem[];

  group: Group;

  constructor(private route: ActivatedRoute, private groupsService: GroupsService) { }

  ngOnInit() {
    // like map, but switches the original observable with the inner observable
    // when the original observable emits again, the inner observable is reset
    // (since the values of the inner observable depend on the outer observable (map))
    // https://blog.angular-university.io/rxjs-switchmap-operator/
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

      this.updateNavItems();
    });
  }

  updateNavItems() {
    this.navItems = [
      new NavItemImpl('Activity', `/groups/view/${this.group._id}`, { exact: true }),
      new NavItemImpl('Meetups', `/groups/view/${this.group._id}/meetups`),
      new NavItemImpl('Members', `/groups/view/${this.group._id}/members`)
    ];
  }

}