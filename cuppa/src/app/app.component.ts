import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './auth.service';
import { Store } from '@ngrx/store';
import { Observable, Subscription, empty } from 'rxjs';
import { User } from './models/User';
import { GroupsService } from './groups.service';
import { switchMap } from 'rxjs/operators';
import { GroupsAndUsers } from './models/Group';


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
              private store: Store<any>) {
    // this.userObservable = store.select(selectUser);
  }

  ngOnInit() {
    // this.authService.getUser()
    // .subscribe((user: User) => {
    //   this.store.dispatch(new LoadUser(user));
    // });

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
      // TODO: dispatch LoadUsers
      // this.groupsStore.dispatch(new LoadGroups(data.groups));
    });

  }

  ngOnDestroy() {
  }
}
