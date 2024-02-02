// role-guard-service.service.ts
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenExpireService } from '../tokenExpire/token-expire.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardServiceService implements CanActivate {
  constructor(
    private auth: TokenExpireService,
    private router: Router,
    private jwtHelper: JwtHelperService
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data['expectedRole'];

    console.log("expected role",expectedRole)
    const token = localStorage.getItem('token');
    // 
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }

    if(!this.checkRole(token, expectedRole)){
      this.router.navigate(['unauthorized']);
      return false;
    }

    
    return true;
  }

  private checkRole(token: string | null, expectedRole: boolean): boolean {
    if (token) {
      const tokenPayload = this.jwtHelper.decodeToken(token);
      return !!tokenPayload && tokenPayload.isAdmin === expectedRole;
    }
    return false;
  }
}
