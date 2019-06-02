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
import { GroupMembersListComponent } from './groups/group-page/members/members-list/group-members-list.component';
import { GroupSettingsComponent } from './groups/group-settings/group-settings.component';
import { MeetupComponent } from './meetups/meetup/meetup.component';
import { JumbotronComponent } from './jumbotron/jumbotron.component';
import { GroupJumbotronComponent } from './groups/group-jumbotron/group-jumbotron.component';
import { MeetupJumbotronComponent } from './meetups/meetup-jumbotron/meetup-jumbotron.component';

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
        path: ':groupId',
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
            path: 'meetups/:meetupId',
            component: MeetupComponent
          },
          {
            path: 'members',
            component: GroupMembersListComponent
          },
          {
            path: 'settings',
            component: GroupSettingsComponent
          },

          /* Jumbotron */
          {
            path: '',
            component: GroupJumbotronComponent,
            outlet: 'jumbotron'
          },
          {
            path: 'meetups/:meetupId',
            component: MeetupJumbotronComponent,
            outlet: 'jumbotron'
          },
        ]
      },
      {
        path: 'communities',
        component: CommunitiesListComponent
      },
      {
        path: 'friends',
        component: FriendsListComponent
      },
    ]
  },
  {
    path: 'meetups',
    component: MeetupsComponent
  },
  {
    path: 'meetups/:meetupId',
    component: MeetupComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    paramsInheritanceStrategy: 'always'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
