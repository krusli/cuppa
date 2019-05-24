import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GroupsComponent } from './groups/groups.component';
import { MeetupsComponent } from './meetups/meetups.component';
import { GroupsListComponent } from './groups/groups-list/groups-list.component';
import { CommunitiesListComponent } from './groups/communities-list/communities-list.component';
import { FriendsListComponent } from './groups/friends-list/friends-list.component';
import { NewGroupComponent } from './groups/new-group/new-group.component';
import { GroupPageComponent } from './groups/group-page/group-page.component';
import { GroupActivityComponent } from './groups/group-page/group-activity/group-activity.component';
import { GroupMeetupsComponent } from './groups/group-page/group-meetups/group-meetups.component';
import { MembersListComponent } from './groups/group-page/members/members-list/members-list.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'groups',
    component: GroupsComponent,
    children: [
      {
        path: '',
        component: GroupsListComponent
      },
      {
        path: 'new',
        component: NewGroupComponent
      },
      {
        path: 'view/:groupId',
        component: GroupPageComponent,
        children: [
          {
            path: '',
            component: GroupActivityComponent
          },
          {
            path: 'meetups',
            component: GroupMeetupsComponent
          },
          {
            path: 'members',
            component: MembersListComponent
          }
        ]
      },
      {
        path: 'communities',
        component: CommunitiesListComponent
      },
      {
        path: 'friends',
        component: FriendsListComponent
      }
    ]
  },
  {
    path: 'meetups',
    component: MeetupsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    paramsInheritanceStrategy: 'always'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
