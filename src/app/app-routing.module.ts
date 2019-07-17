import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './modules/user/services/authguard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home', loadChildren: './home/home.module#HomePageModule',
    canActivate: [AuthGuard]
  },
  { path: 'list', loadChildren: './list/list.module#ListPageModule' },
  { path: 'categorie', loadChildren: './pages/categorie/categorie.module#CategoriePageModule', canActivate: [AuthGuard] },
  { path: 'pagamenti', loadChildren: './pages/pagamenti/payments.module#PaymentsPageModule', canActivate: [AuthGuard] },
  { path: 'fornitori', loadChildren: './pages/fornitori/fornitori.module#FornitoriPageModule' },
  { path: 'shopping-karts', loadChildren: './pages/shoppingKarts/shopping-karts/shopping-karts.module#ShoppingKartsPageModule' },
 // { path: 'selector-items', loadChildren: './modules/item/pages/selector-items/selector-items.module#SelectorItemsPageModule' },
  // { path: 'detail-purchase', loadChildren: './pages/detail-purchase/detail-purchase.module#DetailPurchasePageModule' },
 // { path: 'detail-shopping-kart', loadChildren: './pages/detail-shopping-kart/detail-shopping-kart.module#DetailShoppingKartPageModule' },
 // { path: 'create-payment', loadChildren: './pages/create-payment/create-payment.module#CreatePaymentPageModule' },
 // { path: 'categories-selector', loadChildren: './pages/categories-selector/categories-selector.module#CategoriesSelectorPageModule' },
  // { path: 'view-supplier', loadChildren: './pages/view-supplier/view-supplier.module#ViewSupplierPageModule' },
  // { path: 'filter-popup', loadChildren: './modules/item/pages/filter-popup/filter-popup.module#FilterPopupPageModule' },
  // { path: 'filter-popup', loadChildren: './item/pages/filter-popup/filter-popup.module#FilterPopupPageModule' },
  // tslint:disable-next-line: max-line-length
  // { path: 'create-shopping-kart', loadChildren: './pages/create-shopping-kart/create-shopping-kart.module#CreateShoppingKartPageModule' },
  // { path: 'create-supplier', loadChildren: './pages/create-supplier/create-supplier.module#CreateSupplierPageModule' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
