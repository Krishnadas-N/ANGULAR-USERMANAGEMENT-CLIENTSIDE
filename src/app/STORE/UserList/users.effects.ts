

import { Injectable } from "@angular/core";
import { EMPTY, Observable, catchError, debounce, exhaustMap, map, mergeMap, of, switchMap, tap } from "rxjs";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import { MatSnackBar } from "@angular/material/snack-bar";
import { AdminServiceService } from "./AdminService/admin-service.service";
import * as usersActions from "./users.action";
import { showAlert } from "../GLOBAL STATE/App.action";
import { Store } from "@ngrx/store";
import { AppState } from "../GLOBAL STATE/APP.model";

@Injectable({ 
    providedIn: 'root'
})
export class PostsEffects {

    constructor(private actions$: Actions, private adminService: AdminServiceService,private store:Store<AppState>) {}

    loadUsers$ = createEffect(() => this.actions$.pipe(
        ofType(usersActions.GETUSERS),
        mergeMap(() => this.adminService.getUsers()
          .pipe(
            tap((data) => console.log('Data from API:', data)), // Log the data
            mergeMap((response: any) => [
              showAlert({ message: 'Users Loaded Successfully', actionresult: 'passed' }),
              usersActions.loadUsersSuccess({ userlist: response?.data || [] }),
            ]),
            catchError(error => {
             showAlert({ message: error.message, actionresult: 'failed' });
              return of(usersActions.loadUsersFails({ error }));
            })
        )
      )));

      //Delete the User
      deleteUser$ = createEffect(() =>
      this.actions$.pipe(
        ofType(usersActions.DELETEUSERSTART),
        switchMap(({ userId }) =>
          this.adminService.deleteUser(userId).pipe(
            tap(() => console.log('User deleted')),
            switchMap((response: any) => [
              showAlert({ message: 'User deleted successfully', actionresult: 'passed' }),
              usersActions.deleteUserSucess({ userId }),
              
            ]),
            catchError(error => {
              this.store.dispatch(showAlert({ message: 'Error deleting user'+error.message, actionresult: 'failed' }));
              return of(usersActions.loadUsersFails({ error: error.message }));
            })
          )
        )
      )
    );
    

    searchUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(usersActions.searchStart),
      switchMap(({ searchTerm }) =>
        this.adminService.getUsers(searchTerm, true).pipe(
          map((response: any) => {
            const userlist = response?.data || [];
            console.log("Search userslist ", userlist)
            return usersActions.loadUsersSuccess({ userlist });
          }),
          catchError(error => {
            this.store.dispatch(showAlert({ message: 'Failed to Fetch Users'+error.message, actionresult: 'failed' }));
            return of(usersActions.searchFailure({ error: error.message }));
          })
        )
      )
    )
  );

      _addUser$ = createEffect(() =>
      this.actions$.pipe(
        ofType(usersActions.ADDUSER),
        switchMap(({ user }) =>
          this.adminService.addUser(user).pipe(
            map((response: any) => {
              console.log("User added:", response);
              const newUser = response.data;
              const message = `New user ${newUser.firstname} added successfully!`;

              this.store.dispatch(showAlert({ message, actionresult: 'passed' }));
              
              return usersActions.addUserFromDb({ user: newUser });
            }),
            catchError(err => {
              this.store.dispatch(showAlert({ message: 'Error adding user Please Try again Later '+err.message, actionresult: 'failed' }));
              return of(usersActions.addUserFails({ errorMessage: err.message }));
            })
          )
        )
      )
    );

    _editUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(usersActions.EDITUSER),
      switchMap(({ user }) =>
        this.adminService.editUser(user).pipe(
          tap(_ => console.log('Edited User ', user)),
          mergeMap((response: any) => {
            console.log('User edited ', response);
            const newUser = response.data;
            const message = `User ${newUser.firstname} edited successfully!`;
          
            // Dispatch showAlert for success
            this.store.dispatch(showAlert({ message, actionresult: 'passed' }));
          
            return [usersActions.editUserSucess({ user: newUser })];
          }),
          
          catchError(err => {
            this.store.dispatch(showAlert({ message: 'Error editing user '+err.message, actionresult: 'failed' }));
            return of(usersActions.editUserFailure({ errorMessage: err.message }));
          })
        )
      )
    )
  );



    

}
