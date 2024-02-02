import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileServiceService {
  private CommonUrl ='http://localhost:3000/api/users/'
  constructor(private http:HttpClient) { }

 
  
   profileUpload(file:File ,userId:string){
    const formData:FormData = new FormData();
    formData.append('profileImage',file)
    const headers=this.getheaders()
    return this.http.patch(`${this.CommonUrl}uploadImage/${userId}`, formData, { headers })
    .pipe(
      catchError(error => throwError(error))
    );
   }

   getheaders() {
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
