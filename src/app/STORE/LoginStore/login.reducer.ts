import { createReducer, on } from "@ngrx/store";
import { initialState } from "./login.state";
import { getUser, getUserRetrieved, login, loginFailed, loginSucess, logout, logoutSucess } from "./login.action";

const _LoginHelper = createReducer(
  initialState,

  on(login, (state) => {
    console.log("Login reducer works",state)
    return {
      ...state,
      errorMessage: 'Logging in...'
    };
  }),

  on(getUser, (state) => ({
    ...state,
    errorMessage: ''
  })),

  on(loginSucess, (state, { user }) => ({
    ...state,
    user,
    errorMessage: ''
  })),

  on(getUserRetrieved,(state, { user })=>{
    console.log("reducer of user suce",user);
    console.log("state of the use r",state)
    
  return  {
    ...state,
    user:user,
    errorMessage:''
  }}),

  on(loginFailed, (state, { errorMessage }) => ({
    ...state,
    errorMessage
  })),

  on(logoutSucess, (state) => ({
    ...state,
    user: initialState.user,
    errorMessage: ''
  }))

);

export const LoginReducer = (state: any, action: any) => {
  return _LoginHelper(state, action);
};
