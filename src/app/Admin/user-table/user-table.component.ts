import { Component, OnInit } from '@angular/core';
import { SignedUsers, User } from '../../STORE/UserList/users.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../STORE/GLOBAL STATE/APP.model';
import { deleteUser, deleteUserSucess, getusers } from '../../STORE/UserList/users.action';
import { getIndividualUser, selectUser } from '../../STORE/UserList/users.selector';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserListComponent } from '../EDIT USER/user-list.component';



@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.css'
})
export class UserTableComponent implements OnInit {
  userData:SignedUsers={
    users:[],
    errorMessage:''
   }
  constructor(private store:Store<AppState>,private matDialog: MatDialog){}

  ngOnInit(): void {
    this.store.dispatch(getusers())

      this.store.select(selectUser).subscribe((data:any)=>{
        console.log("USERSSSSSSSSSS",typeof data);
       this.userData.users=data;
        console.log(this.userData.users)
      })
  }
  deleteUser(id:any){
    console.log(id)
   
    if(confirm("Are you Sure to delete this user")){
    this.store.dispatch(deleteUser({userId:id}))
    }
    
  }

  editUser(user:any){
     const dialogRef = this.matDialog.open(UserListComponent, {
    data: { user },
    panelClass: 'custom-dialog',  // Pass id as data
    });
    console.log("user edit clicked ",user)
  // Subscribe to the afterClosed event to get the result when the dialog is closed
  dialogRef.afterClosed().subscribe(result => {
    console.log('Dialog was closed with result:', result);
    // Handle the result if needed
  });
   
  }
}
