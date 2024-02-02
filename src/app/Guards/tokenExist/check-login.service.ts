import { Injectable } from '@angular/core';
import {  CanActivate,  Router, } from '@angular/router';
import { TokenExpireService } from '../tokenExpire/token-expire.service';

@Injectable({
  providedIn: 'root'
})
export class CheckLoginService implements CanActivate {

  constructor(public auth: TokenExpireService,private router:Router) { }

  canActivate(): boolean {
  
    if (this.auth.isAuthenticated()) {
      console.log ('Welcom you have Token');
      this.router.navigate(['/']);
      return false;
    }
    console.log ('Welcome');
    return true;
  }
}