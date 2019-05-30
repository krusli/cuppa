import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { GroupDTO } from './models/Group';

import Consts from 'src/app/consts';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private authService: AuthService) { }

  getGroups() {
    // get auth header
    const headers = this.authService.getHeaders();
    return this.http.get(`${this.baseUrl}:3003/groups`, { headers });
  }

  getGroup(groupId: string) {
    const headers = this.authService.getHeaders();
    return this.http.get(`${this.baseUrl}:3003/groups/${groupId}`, { headers });
  }

  newGroup(group: GroupDTO) {
    const headers = this.authService.getHeaders();
    return this.http.post(`${this.baseUrl}:3001/groups`, group, { headers });
  }
}
