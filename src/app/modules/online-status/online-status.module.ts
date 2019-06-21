import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NetworkMonitorComponent } from './components/network-monitor/network-monitor.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [NetworkMonitorComponent],
  exports:[NetworkMonitorComponent],
  imports: [
    CommonModule,
    IonicModule.forRoot()
  ],
  // schemas: [NO_ERRORS_SCHEMA]
})
export class OnlineStatusModule { }
