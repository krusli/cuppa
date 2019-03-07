import { Component, OnInit, Input } from '@angular/core';
import { navbarAnimation } from '../animations/navbar';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../auth.service';
import { User } from '../models/User';
import { Store } from '@ngrx/store';
import { UserState } from '../state/user.state';
import { Observable } from 'rxjs';
import { AddUser } from '../actions/user.actions';

interface ContainsUser {
  user: User;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  // animations: [navbarAnimation]  // TODO disabled for now
})
export class NavbarComponent implements OnInit {

  user: Observable<User>;

  toggleNavbar = false;
  isLogin = true;

  // used for animations (IIRC)
  navbarState = 'closed'; // closed or open

  // reason modal (login modal) was closed
  closeResult: string;

  // form inputs
  name: string;
  username: string;
  password: string;

  // naming it signUp gives us a JIT error?
  signUpAction() {
    this.authService.signUp(this.name, this.username, this.password)
    .subscribe(this.handleResult);
  }

  login() {
    this.authService.login(this.username, this.password)
    .subscribe(this.handleResult);
  }

  handleResult(x: ContainsUser) {
    this.store.dispatch(new AddUser(x.user));
    this.modalService.dismissAll('Logged in');
  }

  toggleSignupLogin() {
    this.isLogin = !this.isLogin;
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  toggle() {
    this.toggleNavbar = !this.toggleNavbar;

    this.navbarState = this.toggleNavbar ? 'open' : 'closed';
  }

  constructor(private modalService: NgbModal, private authService: AuthService, private store: Store<UserState>) { 
    this.user = store.select('user');
  }

  ngOnInit() {
  }

}
