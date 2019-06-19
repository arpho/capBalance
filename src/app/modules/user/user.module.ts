import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [],
  imports: [IonicModule.forRoot(),
    CommonModule
  ],
  exports: [UserRoutingModule]
})
export class UserModule { }

