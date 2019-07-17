import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CategoriesSelectorPage } from './categories-selector.page';

const routes: Routes = [
  {
    path: '',
    component: CategoriesSelectorPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  // declarations: [CategoriesSelectorPage]
})
export class CategoriesSelectorPageModule { }
