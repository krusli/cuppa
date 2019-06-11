import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import Consts from 'src/app/consts';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  saveToken = map((value: any) => {
    console.log('saveToken');
    if (value.token) {
      localStorage.setItem('token', value.token);
    }
    return value;
  });

  signUp(name: string, username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}:3000/users`, { name, username, password })
    .pipe(this.saveToken);
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}:3000/login`, { username, password })
    .pipe(this.saveToken);
  }

  getHeaders() {
    const token = localStorage.getItem('token');

    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getUser() {
    return this.http.get(`${this.baseUrl}:3000/users/me`, {
      headers: this.getHeaders()
    });
  }
}
