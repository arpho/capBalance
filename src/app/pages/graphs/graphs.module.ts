import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { GraphsPage } from './graphs.page';
import { GoogleChartsModule } from 'angular-google-charts';

const routes: Routes = [
  {
    path: '',
    component: GraphsPage
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
  declarations: [GraphsPage]
})
export class GraphsPageModule {}
