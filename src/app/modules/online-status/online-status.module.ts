import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NetworkMonitorComponent } from './components/network-monitor/network-monitor.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

@NgModule({
  declarations: [NetworkMonitorComponent],
  exports:[NetworkMonitorComponent],
  imports: [
    CommonModule
  ],
  // schemas: [NO_ERRORS_SCHEMA]
})
export class OnlineStatusModule { }
