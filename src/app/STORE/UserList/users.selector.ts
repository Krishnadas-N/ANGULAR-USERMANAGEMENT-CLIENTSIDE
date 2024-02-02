
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { SignedUsers } from "./users.model";


export const SelectUsersState=createFeatureSelector<SignedUsers>('userslist');

export const selectUser = createSelector(SelectUsersState,(state)=>{
    console.log("SELECPR WORKS in Login Users",state.users)
    return state.users;
    })

export const getIndividualUser=(userId:any)=>createSelector(SelectUsersState,(state)=>{
    return  state.users.find((user)=> user._id===userId);
})