export interface User {
  _id: string;
  name: string;
  username: string;
  __v: number;
}

export interface UserMap {
  [key: string]: User;
}
