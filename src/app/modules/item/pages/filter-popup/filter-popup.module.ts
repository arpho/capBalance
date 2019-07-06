import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FilterPopupPage } from './filter-popup.page';

const routes: Routes = [
  {
    path: '',
    component: FilterPopupPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
   declarations: [FilterPopupPage]
})
export class FilterPopupPageModule {}
