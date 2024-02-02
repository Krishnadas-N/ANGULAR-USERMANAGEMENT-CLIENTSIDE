import { LoginReducer } from "../LoginStore/login.reducer";
import { usersReducer } from "../UserList/users.reducer";


export const AppState={
    userlogin:LoginReducer,
    userslist:usersReducer
}