import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './auth.service';
import { Store } from '@ngrx/store';
import { UserState } from './state/user.state';
import { Observable, Subscription, empty } from 'rxjs';
import { User } from './models/User';
import { AddUser } from './actions/user.actions';
import { GroupsService } from './groups.service';
import { switchMap } from 'rxjs/operators';
import { AddGroupsAndUsers } from './actions/groups.actions';
import { GroupsAndUsers } from './models/Group';
import { GroupsState } from './state/groups.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {

  user: User;
  userObservable: Observable<User>;
  userObservableSubscription: Subscription;

  constructor(private authService: AuthService, 
              private groupsService: GroupsService,
              private store: Store<UserState>,
              private groupsStore: Store<GroupsState>) { 
    this.userObservable = store.select('user');
  }

  ngOnInit() {
    this.authService.getUser()
    .subscribe((user: User) => {
      this.store.dispatch(new AddUser(user));
    });

    // no need to unsubscribe, is base Component (tied to browser window lifecycle)
    this.userObservable.pipe(
      switchMap((user: User) => {
        if (!user) {
          return empty();
        }

        this.user = user;
        return this.groupsService.getGroups();
      })
    )
    .subscribe((data: GroupsAndUsers) => {
      this.groupsStore.dispatch(new AddGroupsAndUsers(data))
    })

  }

  ngOnDestroy() {
  }
}
