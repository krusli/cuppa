import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './auth.service';
import { Store } from '@ngrx/store';
import { UserState } from './state/user.state';
import { Observable, Subscription } from 'rxjs';
import { User } from './models/User';
import { SignIn } from './actions/user.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {

  user: User;
  userObservable: Observable<User>;
  userObservableSubscription: Subscription;

  constructor(private authService: AuthService, private store: Store<UserState>) { 
    this.userObservable = store.select('user');
  }

  ngOnInit() {
    this.authService.getUser()
    .subscribe((user: User) => {
      this.store.dispatch(new SignIn(user));
    });

    this.userObservableSubscription = this.userObservable.subscribe((user: User) => {
      this.user = user;
    })
  }

  ngOnDestroy() {
    this.userObservableSubscription.unsubscribe();
  }
}
