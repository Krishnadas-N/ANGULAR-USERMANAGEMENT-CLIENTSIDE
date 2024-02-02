import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { SHOW_ALERT, hideAlert } from "./App.action";
import { catchError, exhaustMap, of, switchMap, tap } from "rxjs";
import { map } from "jquery";


@Injectable({
    providedIn:'root'
})

export class AppEffects{
    constructor(private action$:Actions,private _snackbar:MatSnackBar){
    }

    

                showAlert$ = createEffect(() =>
                    this.action$.pipe(
                    ofType(SHOW_ALERT),
                tap((action) => console.log('Show Alert Called', action)),
                switchMap(({ message, actionresult }) =>
                    this.showSnackbarAlert(message, actionresult).pipe(
                    switchMap(() => of(hideAlert({ message: '' })))
                    )
                )
                ),
            );


    showSnackbarAlert(message: string, actionResult: string) {

        console.log("message from ",message,"actionResult ",actionResult)
        if (actionResult === 'passed') {
          this._snackbar.open(message, 'Dismiss', {
            duration: 5000, // Set the duration in milliseconds
            horizontalPosition: 'end', // Display at the top-right corner
            verticalPosition: 'top',
            panelClass: 'snackbar-success', // Apply the custom styles
          }).afterDismissed();
        }else{
            this._snackbar.open(message,'Dismiss', {
              duration: 8000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
              panelClass: 'snackbar-error'
             })
             }
             return of(null);
        }
       

}