import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './auth.service';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription, empty } from 'rxjs';
import { User } from './models/User';
import { GroupsService } from './groups.service';
import { switchMap } from 'rxjs/operators';
import { GroupsAndUsers } from './models/Group';
import { LoadUser } from './store/actions/auth.actions';
import { LoadGroups } from './store/actions/groups.actions';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {

  user: User;
  user$: Observable<User>;
  subscriptions: Subscription[] = [];

  constructor(private authService: AuthService,
              private groupsService: GroupsService,
              private store: Store<any>) {
    this.user$ = store.pipe(
      select('auth'),
      select('user')
    );
  }

  ngOnInit() {
    // TODO takeUntil
    this.authService.getUser()
    .subscribe((user: User) => {
      this.store.dispatch(new LoadUser(user));
    });

    const subscription = this.user$.subscribe(
      user => {
        if (!user) {
          return;
        }

        this.store.dispatch(new LoadGroups());
      }
    );
    this.subscriptions.push(subscription);
  }

  ngOnDestroy() {
    this.subscriptions.map(x => x.unsubscribe());
  }
}
