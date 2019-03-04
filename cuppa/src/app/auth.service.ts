import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  saveToken = map((value: any) => {
    if (value.token) {
      localStorage.setItem('token', value.token);
    }
    return value;
  });

  signUp(name: string, username: string, password: string): Observable<any> {
    return this.http.post('http://localhost:3000/users', { name, username, password })
    .pipe(this.saveToken);
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post('http://localhost:3000/login', { username, password })
    .pipe(this.saveToken);
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
