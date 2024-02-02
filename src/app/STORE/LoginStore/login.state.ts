import { LoginedUserInfo } from "./login.model";

export const initialState: LoginedUserInfo = {
   user: {
     id: '',
     username: '',
     firstname: '',
     lastname: '',
     email: '',
     profileImage: '',
     isAdmin: false
   },
   errorMessage: ''
 };