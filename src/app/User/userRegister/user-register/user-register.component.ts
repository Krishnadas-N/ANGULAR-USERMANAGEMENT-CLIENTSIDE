import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {SignupType} from'../../../models/user.model'

import { LoginService } from '../../../Services/loginService/login.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../STORE/GLOBAL STATE/APP.model';
import { showAlert } from '../../../STORE/GLOBAL STATE/App.action';
@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.css'
})
export class UserRegisterComponent implements OnInit {

  registrationForm!:FormGroup;
  registrationError: string|null=null;
  isLoading:boolean=false;

  constructor(private formbulider:FormBuilder,private authService:LoginService,private router: Router,private store:Store<AppState>){}
  ngOnInit(): void {
    this.registrationForm=this.formbulider.group({
      firstname:['',[Validators.required]],
      lastname : ['',Validators.required],
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d).{8,}$/)]],
    })
  }
 

  onSubmit(){
    console.log('Form Submitted', this.registrationForm);
    const user:SignupType = this.registrationForm.value;
    this.isLoading=true
    this.authService.signUpUser(user).subscribe(
      (res) => {
      this.isLoading=false
        // Handle success if needed
        console.log('Registration successful', res);
        this.store.dispatch(showAlert({message:'User Registered Succcess fully,Please Login',actionresult:'passed'}))
        // Navigate to login page
        this.router.navigate(['/login']);
      },
      (error) => {
      this.isLoading=false
        console.error('Registration failed', error);
        // Set the error message for display in the template
        this.registrationError = error.error || 'An error occurred during registration.';
        this.store.dispatch(showAlert({message:'Error Ocuured During Registration '+ this.registrationError,actionresult:'Failed'}))
      }
    );
    
  }
}
