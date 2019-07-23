import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
import { Meetup } from './models/Group';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MeetupsService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private authService: AuthService) { }

  getMeetup(meetupId: string): Observable<Meetup> {
    const headers = this.authService.getHeaders();
    return this.http.get<Meetup>(`${this.baseUrl}:3002/meetups/${meetupId}`, { headers });
  }

}
