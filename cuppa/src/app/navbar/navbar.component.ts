import { Component, OnInit } from '@angular/core';
import { navbarAnimation } from '../animations/navbar';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  // animations: [navbarAnimation]  // TODO disabled for now
})
export class NavbarComponent implements OnInit {

  toggleNavbar = false;
  navbarState = 'closed'; // closed or open

  toggle() {
    this.toggleNavbar = !this.toggleNavbar;

    this.navbarState = this.toggleNavbar ? 'open' : 'closed';
  }

  constructor() { }

  ngOnInit() {
  }

}
