import { HttpClient, HttpErrorResponse, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router'
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Login, LoginResponse } from '../../models/user.model';
import {SignupType} from '../../models/user.model'



@Injectable({
  providedIn: 'root'
})

export class LoginService {
  private CommonUrl ='http://localhost:3000/api/';

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  private isAdminSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isAdmin$: Observable<boolean> = this.isAdminSubject.asObservable();

  constructor(private http:HttpClient ) { }

  loginUser(user:Login):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type':'application/json'
    })
     return  this.http.post(`${this.CommonUrl}users/login`,{
        email : user.email,
        password : user.password,
      },{headers})
      .pipe(
        tap((response:any) => {
          console.log(response)
          if ('data' in response && 'token' in response.data && 'isAdmin' in response.data.UserDetails) {
            const { token, isAdmin } = response.data as { token: string; isAdmin: boolean };
            console.log('Successfully logged in',token, isAdmin);
            this.storeToken(token, isAdmin);

            this.isAuthenticatedSubject.next(true); 
            this.isAdminSubject.next(isAdmin);
            
          } else {
            console.error('Invalid response format');
          }
        }
            //console.warn('Your are now Logged In');
        ),
        catchError((error:any)=>{
          const errorMessage = error.error && error.error.message ? error.error.message : 'Unknown error';

          // Return an observable with the error message
          return throwError({ error: 'InvalidCredentials', message: errorMessage });
        })

      )
  }
  

  signUpUser(user:SignupType):Observable<any>{
    const body=JSON.stringify(user);
    const headers = new HttpHeaders({
      'Content-Type':'application/json'
    })

    return this.http.post(`${this.CommonUrl}users/register`,body,{
      headers
    })
    .pipe(
      catchError(this.handleError)
    );

  }
  private handleError(error: HttpErrorResponse): Observable<any> {
    if (error.error instanceof ErrorEvent) {
      // A client-side error occurred
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${JSON.stringify(error.error)}`);
    }
    // Return an observable with a user-facing error message
    return throwError({
      error:  error.error.message,
      status: error.status
    });
  }


  private storeToken(token:string,isAdmin:boolean):void{
    console.log(token,isAdmin)
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('token', token);
      localStorage.setItem('isAdmin', String(isAdmin));
    }else{
      console.log("local storage error ")
    }
  }


  isLoggedIn(): boolean {
    return typeof localStorage !== 'undefined' && localStorage.getItem('token') !== null;
  }

  isAdmin(): boolean {
    return localStorage.getItem('isAdmin') === 'true';
  }
  

  logout() {
    // Remove user-related information from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
    this.isAuthenticatedSubject.next(false);
    this.isAdminSubject.next(false);
    return  of(true);
  }


  getUserDetails(){
    // Retrieve the token from localStorage
    console.log("get User Detials",localStorage.getItem('token'))
   const headers=this.getheaders()
      // Pass the headers in the HTTP request
      return this.http.get(`${this.CommonUrl}users/profile`, { headers })
       .pipe(
         catchError(error => throwError(error))
       );
    
  }

  getheaders() {
    const userToken = localStorage.getItem('token');
  
    if (userToken) {
      return new HttpHeaders({
        Authorization: `Bearer ${userToken}`
      });
    } else {
      return new HttpHeaders();
    }
  }
}

