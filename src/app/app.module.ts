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
import { UserModule } from './modules/user/user.module';
import { DynamicFormModule } from './modules/dynamic-form/dynamic-form.module';
import { GeoLocationModule } from './modules/geo-location/geo-location.module';
import { Storage, IonicStorageModule } from '@ionic/storage';
import { OnlineStatusModule } from './modules/online-status/online-status.module';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './app.effects';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { InfoModule } from './modules/info/info.module';
import { CreateSupplierPage } from './pages/create-supplier/create-supplier.page';
import { CreateShoppingKartPage } from './pages/create-shopping-kart/create-shopping-kart.page';
import { FilterPopupPage } from './modules/item/pages/filter-popup/filter-popup.page';
import { ViewSupplierPage } from './pages/view-supplier/view-supplier.page';
import { SelectorItemsPage } from './modules/item/pages/selector-items/selector-items.page';
import { CreatePurchasePage } from './pages/create-purchase/create-purchase.page';
import { TotalComponent } from './components/total/total.component';
import { DetailPurchasePage } from './pages/detail-purchase/detail-purchase.page';
import { DetailShoppingKartPage } from './pages/detail-shopping-kart/detail-shopping-kart.page';
import { CreatePaymentPage } from './pages/create-payment/create-payment.page';
import { CategoriesSelectorComponent } from './components/categories-selector/categories-selector.component';
import { CategoriesSelectorPage } from './pages/categories-selector/categories-selector.page';
import { CategoryComponent } from './components/category/category.component';
import { CategoriesViewerComponent } from './components/categories-viewer/categories-viewer.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { DetailCategoryPage } from './pages/detail-category/detail-category.page';
import { DetailPaymentPage } from './pages/detail-payment/detail-payment.page';

@NgModule({
  declarations: [
    AppComponent,
    CreateSupplierPage,
    CreateShoppingKartPage,
    ViewSupplierPage,
    FilterPopupPage,
    SelectorItemsPage,
    CreatePurchasePage,
    DetailPurchasePage,
    DetailCategoryPage,
    DetailPaymentPage,
    DetailShoppingKartPage,
    CreatePaymentPage,
    TotalComponent,
    CategoriesSelectorComponent,
    CategoriesSelectorPage,
    CategoryComponent,
    CategoriesViewerComponent

  ],
  imports: [
    BrowserModule,
    ItemModule,
    UserModule,
    InfoModule,
    IonicModule.forRoot(),
    DynamicFormModule,
    OnlineStatusModule,
    GeoLocationModule,
    IonicStorageModule.forRoot(),
    GoogleChartsModule.forRoot(),
    AppRoutingModule,
    OnlineStatusModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([AppEffects])
  ],
  entryComponents: [
    CreateSupplierPage,
    CreateShoppingKartPage,
    ViewSupplierPage,
    FilterPopupPage,
    SelectorItemsPage,
    CreatePurchasePage,
    DetailPurchasePage,
    DetailShoppingKartPage,
    DetailPaymentPage,
    DetailCategoryPage,
    CreatePaymentPage,
    CategoriesSelectorPage
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
