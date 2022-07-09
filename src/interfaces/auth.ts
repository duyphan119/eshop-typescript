import { User } from "./user";

export interface Auth {
  currentUser: User;

  accessToken: string;
}
