import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../STORE/GLOBAL STATE/APP.model';
import { selectUser } from '../../STORE/UserList/users.selector';
import { getusers, loadUsersSuccess } from '../../STORE/UserList/users.action';
import { User } from '../../STORE/UserList/users.model';

@Component({
  selector: 'app-admin-userlist',
  templateUrl: './admin-userlist.component.html',
  styleUrl: './admin-userlist.component.css'
})
export class AdminUserlistComponent implements OnInit{
  constructor(){}

  ngOnInit(): void {
   
  }
}
