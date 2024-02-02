import { Injectable } from '@angular/core';
import {  CanActivate,  Router, } from '@angular/router';
import { TokenExpireService } from './token-expire.service';

@Injectable({
  providedIn: 'root'
})
export class TokenExpireGuardService implements CanActivate {

  constructor(public auth: TokenExpireService,private router:Router) { }

  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      console.log ('bye');
      this.router.navigate(['/login']);
      return false;
    }
    console.log ('Welcome');
    return true;
  }
}
