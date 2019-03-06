import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { GroupDTO } from './models/Group';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  getGroups() {
    // get auth header
    const headers = this.authService.getHeaders();
    return this.http.get('http://localhost:3003/groups', { headers });
  }

  getGroup(groupId: string) {
    const headers = this.authService.getHeaders();
    return this.http.get(`http://localhost:3003/groups/${groupId}`, { headers });
  }

  newGroup(group: GroupDTO) {
    const headers = this.authService.getHeaders();
    return this.http.post('http://localhost:3001/groups', group, { headers });
  }
}
