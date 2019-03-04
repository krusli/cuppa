import { Component, OnInit, OnDestroy } from '@angular/core';
import { GroupsService } from '../groups.service';
import { Group } from '../models/Group';
import { UserMap } from '../models/User';
import { ContentService } from '../content.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  title = 'cuppa';

  featured: any;

  constructor(private contentService: ContentService) { }

  ngOnInit() {
    this.contentService.getFeaturedCommunities()
    .subscribe(data => {
      this.featured = data;
    });
  }

  ngOnDestroy() {
    document.body.style.backgroundImage = 'none';
  }

}
