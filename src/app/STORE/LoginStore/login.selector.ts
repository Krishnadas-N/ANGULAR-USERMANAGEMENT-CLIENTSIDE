import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "../GLOBAL STATE/APP.model";


export const SelectLoginState=createFeatureSelector<AppState>('userlogin');

export const selectUser = createSelector(SelectLoginState,(state)=>{
    console.log("SELECPR WORKS",state.user)
    return state.user;
    })