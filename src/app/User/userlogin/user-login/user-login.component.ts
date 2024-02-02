import { Component,OnDestroy ,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Login,LoginResponse} from '../../../models/user.model'
import { LoginService } from '../../../Services/loginService/login.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../STORE/GLOBAL STATE/APP.model';
import { login } from '../../../STORE/LoginStore/login.action';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})



export class UserLoginComponent implements OnInit {

  constructor(private formBuilder:FormBuilder,private store:Store<AppState>){}
  loginForm!:FormGroup;
  private loginSubscription!:Subscription;
  loginError!: string |null;
  isLoading:boolean=false

  ngOnInit() {

    
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/)]],
    });
  }

  onSubmit(){
    console.log('Form Submitted',this.loginForm);
    if(this.loginForm.valid){
    const user:Login = this.loginForm.value;
    console.log(user)
    this.isLoading=true
    this.store.dispatch(login({user}))
    }

  }

  ngOnDestroy() {
    if(this.loginSubscription){
      this.loginSubscription.unsubscribe();
    }
  }
}
