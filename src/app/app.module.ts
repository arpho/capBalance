import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ItemModule } from './modules/item/item.module';
import {UserModule} from './modules/user/user.module'
import { DynamicFormModule } from './modules/dynamic-form/dynamic-form.module';
import { GeoLocationModule } from './modules/geo-location/geo-location.module';
import { Storage,IonicStorageModule } from '@ionic/storage';
import { OnlineStatusModule } from './modules/online-status/online-status.module';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './app.effects';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    ItemModule,
    UserModule,
    IonicModule.forRoot(),
    DynamicFormModule,
    OnlineStatusModule,
    GeoLocationModule,
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    OnlineStatusModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([AppEffects])
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
