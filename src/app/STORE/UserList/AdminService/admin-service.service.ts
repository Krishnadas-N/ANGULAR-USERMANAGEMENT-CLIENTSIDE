import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {
  private CommonUrl ='http://localhost:3000/api/';
  constructor(private http:HttpClient) { }

  getUsers(searchQuery:string='',isquery:boolean=false):Observable<any>{
    console.log("get Users ")
    const url  = isquery ? `${this.CommonUrl}admin/userslist?search=${searchQuery}` : `${this.CommonUrl}admin/userslist`;
    const headers=this.getheaders()
    return  this.http.get(url,{headers})
    .pipe(
      catchError(error => throwError(error))
    );
  }

  deleteUser(id:any){
    console.log("delelte user service" ,id);
    const headers = this.getheaders();
    return this.http.delete(`${this.CommonUrl}admin/deleteUser/${id}`,{headers})
    .pipe(
      catchError(error => throwError(error))
    );
  }


  addUser(user: any) {
    console.log('add User Service ', user);
    const headers = this.getheaders();
    return this.http.post(`${this.CommonUrl}admin/adduser`, user, { headers })
      .pipe(
        catchError(error => throwError(error))
      );
  }
  
  editUser(user:any){
    console.log("edit users checks " );
    const headers=this.getheaders();
    const id = user._id
    if(!id){
      throwError("id is not defined")
    }
    return this.http.put(`${this.CommonUrl}admin/editUser/${id}`,user,{headers})
    .pipe(
      catchError(error => throwError(error))
    );
  }


  private getheaders() {
    const userToken = localStorage.getItem('token');
  
    if (userToken) {
      return new HttpHeaders({
        Authorization: `Bearer ${userToken}`
      });
    } else {
      return new HttpHeaders();
    }
  }
}
