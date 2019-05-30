import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

import Consts from 'src/app/consts';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private authService: AuthService) { }

  getFeaturedCommunities() {
    const headers = this.authService.getHeaders();
    return this.http.get(`${this.baseUrl}:3003/communities/featured`, { headers });
  }

}
