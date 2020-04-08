export interface IUser {
  id: number;
  name: string;
  surname: string;
  email: string;
  img_url: string;
  level: any;
  created_at: Date;
  updated_at: Date
}

export interface IAvatar {
  id: number;
  url: string;
}

export interface IState {
  users: IUser[];
  avatars: IAvatar[];
}

export interface IAction {
  type: string;
  payload: any
}