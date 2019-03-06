import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(private http: HttpClient, private authService: AuthService) { }


  getFeaturedCommunities() {
    const headers = this.authService.getHeaders();

    return this.http.get('http://localhost:3003/communities/featured', { headers });
  }
}