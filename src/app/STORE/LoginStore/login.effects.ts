import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { LoginService } from "../../Services/loginService/login.service";
import { Router } from "@angular/router";
import { GET_USER, LOGIN, LOGIN_FAILED, LOGIN_SUCESS, LOGOUT, USER_RETRIEVED, getUserRetrieved, login, loginFailed, loginSucess, logout, logoutFailure, logoutSucess } from "./login.action";
import { EMPTY, catchError, concat, map, of, switchMap, tap } from "rxjs";
import { showAlert } from "../GLOBAL STATE/App.action";
import { AppState } from "../GLOBAL STATE/APP.model";
import { Store } from "@ngrx/store";

@Injectable({
    providedIn:'root'
})
export class UserEffects{

    constructor(private actions$: Actions, private userService: LoginService, private router: Router,private store:Store<AppState>) {}

        login$ = createEffect(() =>
        this.actions$.pipe(
        ofType(LOGIN),
        switchMap(({ user }) =>
            this.userService.loginUser(user).pipe(
            tap((response) => console.log('Login Response:', response,response.data.UserDetails)),
            map((response) => loginSucess({ user: response.data.UserDetails })),
            catchError((error) => of(loginFailed({ errorMessage: error.message })))
            )
        ) ));

        getUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(GET_USER),
            switchMap(() =>
            this.userService.getUserDetails().pipe(
                tap((response) => console.log('USER RETRIVAL', response)),
                map((response:any) => getUserRetrieved({ user: response?.data })),
                catchError((error) => of(loginFailed({ errorMessage: error.message  })))
              )
              )
              )
            );
        
          
        loginSuccess$ = createEffect(()=>
            this.actions$.pipe(
                ofType(LOGIN_SUCESS),
                tap(()=>{
                    console.log('Successfully logged in');
                    this.router.navigate(['/'])
                })
            )
        , { dispatch: false } 
        );

        loginFailed$=createEffect(()=>
        this.actions$.pipe(
          ofType(LOGIN_FAILED),
          tap(()=>{
              console.log('LoginFails');
          }),
          map(({errorMessage})=>
         this.store.dispatch(showAlert({ message: 'Error Occured '+errorMessage, actionresult: 'failed' }))
          )
      )
      , { dispatch: false } 
        )

        logout$ = createEffect(() =>
        this.actions$.pipe(
          ofType(LOGOUT),
          switchMap(() =>
            this.userService.logout().pipe(
              switchMap(() =>
                concat(
                  of(logoutSucess()),
                  of(showAlert({ message: 'Logout successfully', actionresult: 'passed' }))
                )
              ),
              catchError(error => of(logoutFailure({ error })))
            )
          ),
          tap(() => {
            // Navigate to the login page
            this.router.navigate(['/login']); // Replace '/login' with the actual route for your login page
          })
        )
      );
}