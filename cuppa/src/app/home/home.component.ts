import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  title = 'cuppa';

  constructor() { }

  ngOnInit() { }

  ngOnDestroy() {
    document.body.style.backgroundImage = 'none';
  }

}
