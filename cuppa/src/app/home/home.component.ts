import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../models/User';
import { ContentService } from '../content.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  title = 'cuppa';

  user: Observable<User>;

  featured: any;

  constructor(private contentService: ContentService, private store: Store<any>) {
    // this.user = store.select(selectUser);
  }

  ngOnInit() {
    this.user.pipe(
      switchMap(x => {
        return this.contentService.getFeaturedCommunities();
      })
    )
    .subscribe(data => {
      this.featured = data;
    });
  }

  ngOnDestroy() {
    document.body.style.backgroundImage = 'none';
  }

}
