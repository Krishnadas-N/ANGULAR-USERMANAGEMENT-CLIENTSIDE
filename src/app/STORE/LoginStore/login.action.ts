import { createAction, props } from "@ngrx/store";
import { User, UserLogin } from "./login.model";

export const LOGIN ='[LOGIN] LOGIN USER';

export const LOGIN_SUCESS ='[LOGIN] LOGIN SUCESS';

export const LOGIN_FAILED ='[LOGIN] LOGIN FAILED';

export const GET_USER ='[LOGIN] GET LOGGED USER'

export const LOGOUT = '[LOGOUT] LOGOUT'

export const LOGOUT_SUCESS='[LOGOUT] LOGOUT SUCESS';

export const LOGOUT_FAILURE ='[LOGOUT] LOGOUT FAILURE'

export const USER_RETRIEVED = '[AFTER LOGIN] USER DATA RETRIEVAL'

export const login = createAction(LOGIN,props<{user:UserLogin}>())

export const getUser = createAction(GET_USER)

export const loginSucess= createAction(LOGIN_SUCESS,props<{user:User}>());

export const getUserRetrieved  = createAction(USER_RETRIEVED, props<{ user: User }>())

export const loginFailed = createAction(LOGIN_FAILED,props<{errorMessage:string}>());

export const logout = createAction(LOGOUT);

export const logoutSucess= createAction(LOGOUT_SUCESS);

export const logoutFailure = createAction(LOGOUT_FAILURE,props<{error:string}>())
