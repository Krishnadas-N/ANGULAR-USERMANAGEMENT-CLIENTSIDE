import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from './User/userlogin/user-login/user-login.component';
import { UserRegisterComponent } from './User/userRegister/user-register/user-register.component';
import { UserHomeComponent } from './User/userHome/user-home/user-home.component';
import { PreloadAllModules } from '@angular/router';
import { AdminUserlistComponent } from './Admin/admin-userlist/admin-userlist.component';
import { TokenExpireGuardService as AuthGuard } from './Guards/tokenExpire/token-expire-guard.service';
import { CheckLoginService as CheckLogin } from './Guards/tokenExist/check-login.service';
import { RoleGuardServiceService } from './Guards/roleguard/role-guard-service.service';
import { UnauthorizedComponent } from './unauthorized/unauthorized/unauthorized.component';

const routes: Routes = [
  {
    path:'',
    component:UserHomeComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'login',
    component:UserLoginComponent,
    canActivate:[CheckLogin]

  },
  {
    path:"register",
    component:UserRegisterComponent,
    canActivate:[CheckLogin]
  },
  {
    path:'users',
    component:AdminUserlistComponent,
    canActivate:[AuthGuard,RoleGuardServiceService],
    data: {
      expectedRole: true
    }
  },
  { path: 'profile', loadChildren: () => import('./userProfile/profile/profile.module').then(m => m.ProfileModule),canActivate:[AuthGuard] },
  {
    path:'unauthorized',
    component:UnauthorizedComponent

  },
  {path:'**',redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
