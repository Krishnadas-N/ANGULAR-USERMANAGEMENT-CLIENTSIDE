import { createAction, props } from "@ngrx/store";
import { User } from "./users.model";
import { SignupType } from "../../models/user.model";


export const GETUSERS = '[ADMIN]  Get USERS';

export const LOAD_USERS_SUCESS='[ADMIN] LOADING USERS'

export const LOAD_USERS_FAILURE='[ADMIN] LOADING FAILS'

export const DELETEUSER='[ADMIN] DELETE USER'

export const DELETEUSERSTART='[ADMIN] SENT REQUEST TO DELETE'

export const SEARCH ='[ADMIN] SEARCH USER' 

export const SEARCHFAILURE ='[ADMIN] SEARCH FAILS';

export const ADDUSER='[ADMIN] ADD USER ';

export const ADDUSERSUCESS ='[ADMIN] ADD USER SUCESS';

export const ADDUSERFAILURE ='[ADMIN] ADD USER FAILURE'


export const EDITUSER = '[ADMIN] EDIT USER';

export const EDITUSERSUCESS='[ADMIN] EDIT USER SUCCESS';

export const EDITUSERFAILURE='[ADMIN] EDIT USER FAILS'


//INTIALLY LOAD ALL USERS FROM DB TO STORE

export const loadUsersSuccess=createAction(LOAD_USERS_SUCESS,props<{userlist:User[]}>() );

export const loadUsersFails=createAction(LOAD_USERS_FAILURE,props<{error:string}>());


export const deleteUser = createAction(DELETEUSERSTART,props<{userId:string}>())

export const deleteUserSucess= createAction(DELETEUSER,props<{userId:string}>())


//GET ALL USERS

export const getusers= createAction(GETUSERS);



//SEARCH USER

export const searchStart = createAction(SEARCH, props<{ searchTerm: string }>());

export const searchFailure = createAction('[Search] Failure', props<{ error: string }>());


//ADD USER

export const addNewUser=createAction(ADDUSER , props<{user:SignupType}>());

export const addUserFromDb = createAction(ADDUSERSUCESS,props<{user:User}>());

export const addUserFails=createAction(ADDUSERFAILURE,props<{errorMessage:string}>());


export const editUser=createAction(EDITUSER,props<{user:User}>());

export const editUserSucess = createAction(EDITUSERSUCESS,props<{user:User}>())

export const editUserFailure=createAction(EDITUSERFAILURE,props<{errorMessage:string}>())