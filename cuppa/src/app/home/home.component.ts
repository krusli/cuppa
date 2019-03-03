import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  title = 'cuppa';

  constructor() { }

  ngOnInit() {
    document.body.style.backgroundImage = 'url("/assets/img/hero.jpg")';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundSize = 'cover';
  }

  ngOnDestroy() {
    document.body.style.backgroundImage = 'none';
  }

}
