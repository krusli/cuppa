import { Component, OnInit } from '@angular/core';
import { navbarAnimation } from '../animations/navbar';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  // animations: [navbarAnimation]  // TODO disabled for now
})
export class NavbarComponent implements OnInit {

  toggleNavbar = false;
  navbarState = 'closed'; // closed or open

  closeResult: string;

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

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

}
