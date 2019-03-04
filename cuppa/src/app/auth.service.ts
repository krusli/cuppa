import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
const { filter, map, reduce, } = require('rxjs/operators');

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const observable = this.http.post('http://localhost:3000/login', { username, password });
    return observable.pipe(map(value => {
      if (value.token) {
        localStorage.setItem('token', value.token);
      }
      return value;
    }));
  }

  getUser() {
    const token = localStorage.getItem('token');
    return this.http.get('http://localhost:3000/users/me', {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    });
  }
}
