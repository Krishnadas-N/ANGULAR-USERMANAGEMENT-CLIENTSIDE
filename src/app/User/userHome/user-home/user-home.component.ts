import { Component, OnInit } from '@angular/core';
import { ProfileServiceService } from '../../../Services/profileServices/profile-service.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../STORE/GLOBAL STATE/APP.model';
import { selectUser } from '../../../STORE/LoginStore/login.selector';
import { getUser } from '../../../STORE/LoginStore/login.action';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.css'
})
export class UserHomeComponent implements OnInit {
 
  isAdmin:boolean=false;
  userName:string=''
  constructor(private Service:ProfileServiceService,private store:Store<AppState>) {
  }
  ngOnInit(): void {

    this.store.dispatch(getUser())

      this.store.select(selectUser).subscribe((data:any)=>{
        console.log("selected at Home",data)
        this.userName=data.username;
        this.isAdmin=data.isAdmin
      })
  }

}
