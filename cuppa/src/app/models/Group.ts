
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

export interface Activity {
  _id: string;
  user: string;
  subject: string;
  subjectType: string;
  action: string;
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
  activity: Activity[];
}

/* used during group creation */
export interface GroupDTO {
  name: string;
  description: string;
}
