import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SankeyPage } from './sankey.page';
import { GoogleChartsModule } from 'angular-google-charts';
import { DynamicFormModule } from 'src/app/modules/dynamic-form/dynamic-form.module';

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
    DynamicFormModule,
    GoogleChartsModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  declarations: [SankeyPage]
})
export class SankeyPageModule {}
