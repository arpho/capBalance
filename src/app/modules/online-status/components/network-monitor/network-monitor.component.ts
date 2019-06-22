import { Component, OnInit } from '@angular/core';
import * as fromRoot from '../../reducers/network.reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
//import { StartOnlineOfflineCheck } from '../../actions/network.actions';
import { ConnectionService } from 'ng-connection-service'

@Component({
  selector: 'app-network-monitor',
  templateUrl: './network-monitor.component.html',
  styleUrls: ['./network-monitor.component.scss'],
})
export class NetworkMonitorComponent implements OnInit {
  // isOnline$:Observable<boolean>
  title = 'connectionDetector';
  status = 'ONLINE'; //initializing as online by default
  isConnected = true;
  ngOnInit() {
    this.connectionService.monitor().subscribe((isConnected) => {
      this.isConnected = isConnected;
      if (this.isConnected) {
        this.status = 'ONLINE';
      } else {
        this.status = 'OFFLINE';
      }
    });

  }

  constructor(private connectionService: ConnectionService) {

  }

}
