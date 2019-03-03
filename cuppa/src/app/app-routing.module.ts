import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GroupsComponent } from './groups/groups.component';
import { MeetupsComponent } from './meetups/meetups.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'groups',
    component: GroupsComponent
  },
  {
    path: 'meetups',
    component: MeetupsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
