import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CreateShoppingKartPage } from './create-shopping-kart.page';

const routes: Routes = [
  {
    path: '',
    component: CreateShoppingKartPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
   // declarations: [CreateShoppingKartPage]
})
export class CreateShoppingKartPageModule {}
