import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { GroupsComponent } from './groups/groups.component';
import { MeetupsComponent } from './meetups/meetups.component';
import { GroupsTabBarComponent } from './groups/groups-tab-bar/groups-tab-bar.component';
import { GroupsSidebarComponent } from './groups/groups-sidebar/groups-sidebar.component';
import { ShelfComponent } from './shelf/shelf.component';
import { GroupsListComponent } from './groups/groups-list/groups-list.component';
import { CommunitiesListComponent } from './groups/communities-list/communities-list.component';
import { FriendsListComponent } from './groups/friends-list/friends-list.component';
import { GroupComponent } from './groups/group/group.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NewGroupComponent } from './groups/new-group/new-group.component';
import { GroupPageComponent } from './groups/group-page/group-page.component';
import { TabBarComponent } from './common/tab-bar/tab-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    GroupsComponent,
    MeetupsComponent,
    GroupsTabBarComponent,
    GroupsSidebarComponent,
    ShelfComponent,
    GroupsListComponent,
    CommunitiesListComponent,
    FriendsListComponent,
    GroupComponent,
    NewGroupComponent,
    GroupPageComponent,
    TabBarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
