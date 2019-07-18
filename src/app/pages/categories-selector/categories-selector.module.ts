import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CategoriesSelectorPage } from './categories-selector.page';
import { ItemModule } from 'src/app/modules/item/item.module';

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
    ItemModule,
    RouterModule.forChild(routes)
  ],
  // declarations: [CategoriesSelectorPage]
})
export class CategoriesSelectorPageModule { }
