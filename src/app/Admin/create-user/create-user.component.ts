import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { AppState } from '../../STORE/GLOBAL STATE/APP.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignupType } from '../../models/user.model';
import { addNewUser } from '../../STORE/UserList/users.action';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  @ViewChild('userModal') userModal!: NgbModalRef;

  AdduserForm!:FormGroup;

  constructor(private modalService: NgbModal,private formBulider:FormBuilder,private store:Store<AppState>) {}
  // addNewUser

  ngOnInit(): void {
    this.AdduserForm=this.formBulider.group({
      firstname:['',[Validators.required]],
      lastname : ['',Validators.required],
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d).{8,}$/)]],
    })
  }

  openModal(): void {
    this.modalService.open(this.userModal);  // Use ng-bootstrap's modal service
  }

  onSubmit(): void {

    if(this.AdduserForm.valid){
      const user:SignupType = this.AdduserForm.value;
      console.log("New user Value ",user)

      this.store.dispatch(addNewUser({user:user}))
    }
    // Handle form submission logic here
    this.modalService.dismissAll(); // Close the modal after submission
  }

}
