import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from '../../../Services/loginService/login.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../STORE/GLOBAL STATE/APP.model';
import { selectUser } from '../../../STORE/LoginStore/login.selector';
import { logout } from '../../../STORE/LoginStore/login.action';

@Component({
  selector: 'app-header-component',
  templateUrl: './header-component.component.html',
  styleUrl: './header-component.component.css'
})
export class HeaderComponentComponent implements OnInit,OnDestroy  {
  private authSubscription!: Subscription;
  private isAdminSubscription!: Subscription;


  isNavCollapsed = true;
  isLoading:boolean=true;
  isLoggedIn:boolean=false;
  isAdmin!:boolean
 
  constructor(private authService: LoginService, private router: Router ,private store:Store<AppState>) {
   
  }

  ngOnInit(): void {
   
    this.authSubscription = this.authService.isAuthenticated$.subscribe(
      (isAuthenticated) => {
        this.isLoggedIn = isAuthenticated;
        this.isLoading=false;
      }
    );

  

    if (this.authService.isLoggedIn()) {
      this.isLoggedIn = true;
    }

    if (this.authService.isAdmin()) {
      this.isAdmin = true;
    }

      
    this.store.select(selectUser).subscribe((data:any)=>{
      console.log("selected at Home",data)
      
      this.isAdmin=data.isAdmin;
    })
    
    console.log("Is Logged In:", this.isLoggedIn, "Is Admin:", this.isAdmin);
  }

  logout(): void {
    this.store.dispatch(logout())
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();

    }
    if(this.isAdminSubscription){
      this.isAdminSubscription.unsubscribe();
    }
  }
}
