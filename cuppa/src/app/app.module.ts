import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { GroupsComponent } from './groups/groups.component';
import { MeetupsComponent } from './meetups/meetups.component';
import { GroupsTabBarComponent } from './groups/groups-tab-bar/groups-tab-bar.component';
import { GroupsSidebarComponent } from './groups/groups-sidebar/groups-sidebar.component';
import { ShelfComponent } from './shelf/shelf.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    GroupsComponent,
    MeetupsComponent,
    GroupsTabBarComponent,
    GroupsSidebarComponent,
    ShelfComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
