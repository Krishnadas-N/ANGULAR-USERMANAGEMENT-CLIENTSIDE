
import { createReducer, on } from "@ngrx/store";
import { SignedUsers } from "./users.model";
import { addUserFails, addUserFromDb, deleteUserSucess, editUserFailure, editUserSucess, getusers, loadUsersFails, loadUsersSuccess } from "./users.action";
import { IntitalState } from "./users.state";

const _usersReducer = createReducer(
  IntitalState,
  
  on(getusers, (state) => {
    return { ...state };
  }),

  on(loadUsersSuccess, (state, { userlist }) => {
    return {
      ...state,
      users: userlist,
      errorMessage: ''
    };
  }),

  on(loadUsersFails, (state, { error }) => {
    return {
      ...state,
      errorMessage: error
    };
  }),

  on(deleteUserSucess, (state, { userId }) => {
    console.log("delelteduser",userId)
    const newList = state.users.filter((user) => user._id !== userId );
    console.log(newList)
    return {...state, users :newList}
    }),

    on(addUserFromDb, (state, action) => {
      const _data={...action.user}
      return {
        ...state,
        users: [...state.users, _data],
        errorMessage: ''
      };
    }),
    
    on(addUserFails, (state, { errorMessage }) => ({
      ...state,
      users: state.users,
      errorMessage: errorMessage
    })),

    on(editUserSucess,(state,action)=>{
      const updatedUsers = [...state.users];
       const index = updatedUsers.findIndex(item => item._id === action.user._id);

      if (index !== -1) {
        updatedUsers[index] = action.user;
      } 
      return {...state,users:updatedUsers};
    }),

    on(editUserFailure,(state,action)=>{
      return{
        ...state,
        errorMessage: action.errorMessage,
    }}),
);

export function usersReducer(state: SignedUsers | undefined, action: any) {
  return _usersReducer(state, action);
}

