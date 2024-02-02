import { UserInfo } from "os";
import { LoginedUserInfo, User } from "../LoginStore/login.model";
import { SignedUsers } from "../UserList/users.model";

export interface AppState {
    user: LoginedUserInfo;
    users:SignedUsers
   
   
  }
  