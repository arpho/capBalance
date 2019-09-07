import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SankeyPage } from './sankey.page';
import { GoogleChartsModule } from 'angular-google-charts';

const routes: Routes = [
  {
    path: '',
    component: SankeyPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GoogleChartsModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  declarations: [SankeyPage]
})
export class SankeyPageModule {}
