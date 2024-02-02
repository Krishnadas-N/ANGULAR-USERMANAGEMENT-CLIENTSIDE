import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { ProfilePicComponent } from '../profile-pic/profile-pic/profile-pic.component';


@NgModule({
  declarations: [
     ProfileComponent,
    ProfilePicComponent
    
  ],
  imports: [
    
    CommonModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
