import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../STORE/GLOBAL STATE/APP.model';
import { editUser } from '../../STORE/UserList/users.action';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
  
  userForm!: FormGroup;

  constructor(private dialogRef: MatDialogRef<UserListComponent>,
     @Inject(MAT_DIALOG_DATA) public data: any,
     private fb: FormBuilder,
     private store:Store<AppState>){

     }

  ngOnInit() {
    console.log('Received data in UserListComponent:', this.data);

    this.userForm = this.fb.group({
      _id:[this.data?.user?._id],
      username: [this.data?.user?.username ?? '', Validators.required],
      firstname: [this.data?.user?.firstname ?? '', Validators.required],
      lastname: [this.data?.user?.lastname ?? '', Validators.required],
      email: [this.data?.user?.email ?? '', [Validators.required, Validators.email]],
    });

    
  }

  onSubmit() {
    console.log('Form submitted:', this.userForm.value);

    if (this.userForm.valid) {
      const  user= {...this.userForm.value};
    this.store.dispatch(editUser({user:user}))
    } 
    this.dialogRef.close(this.userForm.value);
  }

  onCancel() {
    this.dialogRef.close();
  }

}
