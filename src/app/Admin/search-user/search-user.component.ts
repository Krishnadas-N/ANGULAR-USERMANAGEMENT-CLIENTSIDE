import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../STORE/GLOBAL STATE/APP.model';
import { searchStart } from '../../STORE/UserList/users.action';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrl: './search-user.component.css'
})
export class SearchUserComponent {

  constructor(private store:Store<AppState>){

  }
  onSearch(searchquery:string){
    this.store.dispatch(searchStart({searchTerm:searchquery}))
  }

}
