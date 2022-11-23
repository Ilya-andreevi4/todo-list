export interface IUser {
  uid: string;
  email: string | null;
  password?: string;
  token?: string;
  id?: string;
  timestamp?: any;
}
