import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './auth.service';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription, empty } from 'rxjs';
import { User } from './models/User';
import { GroupsService } from './groups.service';
import { switchMap } from 'rxjs/operators';
import { GroupsAndUsers } from './models/Group';
import { LoadUser } from './store/actions/auth.actions';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {

  user: User;
  user$: Observable<User>;
  user$Subscription: Subscription;

  constructor(private authService: AuthService,
              private groupsService: GroupsService,
              private store: Store<any>) {
    this.user$ = store.pipe(
      select('auth'),
      select('user')
    );
  }

  ngOnInit() {
    this.authService.getUser()
    .subscribe((user: User) => {
      this.store.dispatch(new LoadUser(user));
    });

    // no need to unsubscribe, is base Component (tied to browser window lifecycle)?
    this.user$.pipe(
      switchMap((user: User) => {
        if (!user) {
          return empty();
        }

        this.user = user;
        return this.groupsService.getGroups();
      })
    )
    .subscribe((data: GroupsAndUsers) => {
      // TODO: dispatch LoadUsers

      // TODO: re-enable
      // We have the logged in users, get the user's Groups.
      // this.groupsStore.dispatch(new LoadGroups(data.groups));
    });

  }

  ngOnDestroy() {
  }
}
