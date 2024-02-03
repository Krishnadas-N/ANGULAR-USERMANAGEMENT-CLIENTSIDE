import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserLoginComponent } from './User/userlogin/user-login/user-login.component';
import { UserRegisterComponent } from './User/userRegister/user-register/user-register.component';
import { UserHomeComponent } from './User/userHome/user-home/user-home.component';
import { HeaderComponentComponent } from './components/header/header-component/header-component.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch } from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon';
import { SpinnerComponent } from './components/utility/spinner/spinner.component';
import { ProfileModule } from './userProfile/profile/profile.module';
import { TokenAddInterceptorInterceptor  } from './Interceptors/token-add-interceptor.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UnauthorizedComponent } from './unauthorized/unauthorized/unauthorized.component';
import { AdminUserlistComponent } from './Admin/admin-userlist/admin-userlist.component';
import { SearchUserComponent } from './Admin/search-user/search-user.component';
import { UserListComponent } from './Admin/EDIT USER/user-list.component';
import { UserTableComponent } from './Admin/user-table/user-table.component';
import { UserRowComponent } from './Admin/user-row/user-row.component';
import { CreateUserComponent } from './Admin/create-user/create-user.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AppState } from './STORE/GLOBAL STATE/App.state';
import { UserEffects } from './STORE/LoginStore/login.effects';
import { JwtHelperService ,  JWT_OPTIONS,JwtModule  } from '@auth0/angular-jwt';
// import { TokenExpireService } from './Guards/tokenExpire/token-expire.service';
import { MatButtonModule } from '@angular/material/button';
import { PostsEffects } from './STORE/UserList/users.effects';
import {MatDialogModule} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AppEffects } from './STORE/GLOBAL STATE/App.effects';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    UserRegisterComponent,
    UserHomeComponent,
    HeaderComponentComponent,
    SpinnerComponent,
    UnauthorizedComponent,
    AdminUserlistComponent,
    SearchUserComponent,
    UserListComponent,
    UserTableComponent,
    UserRowComponent,
    CreateUserComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
   ProfileModule,
   MatDialogModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(AppState),
    EffectsModule.forRoot([UserEffects,PostsEffects,AppEffects])
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenAddInterceptorInterceptor,
      multi: true
    },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

