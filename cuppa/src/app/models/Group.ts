
export interface Meetup {
  attendees: any[];
  _id: string;
  name: string;
  group: string;
  owner: string;
  createdOn: Date | string;
  events: any[];
  teams: any[];
  roles: any[];
  __v: number;
}

export interface Group {
  members: string[];
  _id: string;
  name: string;
  description: string;
  owner: string;
  createdOn: Date | string;
  __v: number;
  roles: any[];
  meetups: Meetup[];
}

export interface GroupDTO {
  name: string;
  description: string;
}