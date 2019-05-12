import { Component, OnInit, Input } from '@angular/core';
import { navbarAnimation } from '../animations/navbar';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../auth.service';
import { User } from '../models/User';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LoadUser } from '../store/actions/auth.actions';
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

  user$: Observable<User>;

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

  constructor(private modalService: NgbModal, private authService: AuthService, private store: Store<any>) {
    this.user$ = store.pipe(
      select('auth'),
      select('user')
    )
  }

  // naming it signUp gives us a JIT error?
  signUpAction() {
    this.authService.signUp(this.name, this.username, this.password)
      .subscribe(x => this.handleResult(x));
  }

  login() {
    this.authService.login(this.username, this.password)
      .subscribe(x => this.handleResult(x));
  }

  handleResult(x: ContainsUser) {
    this.store.dispatch(new LoadUser(x.user));
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

  ngOnInit() {
  }

}
