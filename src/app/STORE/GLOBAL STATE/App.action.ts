import { createAction, props } from "@ngrx/store";

export const SHOW_ALERT = '[APP EVENT]  Show Alert';
export const HIDE_ALERT = '[APP EVENT]  Hide Alert';

// Action Creators
export const showAlert = createAction(SHOW_ALERT,props<{message:string,actionresult:string}>());

export const  hideAlert = createAction(HIDE_ALERT,props<{message:string}>())

