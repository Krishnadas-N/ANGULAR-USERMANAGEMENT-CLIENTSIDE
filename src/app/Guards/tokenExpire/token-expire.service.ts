// token-expire.service.ts
import {  Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class TokenExpireService {

  constructor(
    private jwtHelper: JwtHelperService,
    ) { }

   public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
   
      console.log(token )
      return !this.jwtHelper.isTokenExpired(token);
   
  }
}
