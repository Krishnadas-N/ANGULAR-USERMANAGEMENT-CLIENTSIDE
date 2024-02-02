import { Component, Input } from '@angular/core';
import { ProfileServiceService } from '../../../Services/profileServices/profile-service.service';
import { MatSnackBar } from '@angular/material/snack-bar'
@Component({
  selector: 'app-profile-pic',
  templateUrl: './profile-pic.component.html',
  styleUrl: './profile-pic.component.css'
})
export class ProfilePicComponent {
  // var loadFile = function (event) {
  //   var image = document.getElementById("output");
  //   image.src = URL.createObjectURL(event.target.files[0]);
  // };
  constructor(private service:ProfileServiceService,private snackBar: MatSnackBar){}
  @Input() src!:string;
  @Input() userId: string ='';
  loading: boolean = false;

  upload(image:any){
    this.loading = true;
    console.log(image.target.files[0]);
    const file = image.target.files[0];
    this.service.profileUpload(file,this.userId).subscribe(
      (response:any) => {
        console.log('File successfully uploaded. Download URL:', response);
        // Handle the download URL as needed
        this.src=response.data.downloadURL;

        this.snackBar.open('Image uploaded successfully!', 'Dismiss', {
          duration: 5000,  // Duration in milliseconds
        });

        setTimeout(()=>{
          this.loading = false;
        },500)
      
      },
      (error) => {
        console.error('Error uploading profile image:', error);
      }
    )
  }

}
