import { Component, OnInit } from '@angular/core';
import { userData } from '../../models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../STORE/GLOBAL STATE/APP.model';
import { getUser } from '../../STORE/LoginStore/login.action';
import { selectUser } from '../../STORE/LoginStore/login.selector';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']  // Fix the typo here
})
export class ProfileComponent implements OnInit {
  userDetails!: userData;
  userProfileImage!:string;
  userId!:string;
  constructor(private store:Store<AppState>) {}

  ngOnInit(): void {

    this.store.dispatch(getUser())

    this.store.select(selectUser).subscribe((response:any)=>{
      console.log("selected at",response);
      this.userDetails = response;
      this.userProfileImage=this.userDetails?.profileImage
      this.userId = this.userDetails.id
    })
    
  }
}
