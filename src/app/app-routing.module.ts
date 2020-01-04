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
  { path: 'fornitori', loadChildren: './pages/fornitori/fornitori.module#FornitoriPageModule', canActivate: [AuthGuard] },
  {
    path: 'shopping-karts', loadChildren: './pages/shoppingKarts/shopping-karts/shopping-karts.module#ShoppingKartsPageModule', canActivate: [AuthGuard]
  },
  { path: 'graphs', loadChildren: './pages/graphs/graphs.module#GraphsPageModule', canActivate: [AuthGuard] },
  { path: 'graphs/piechart', loadChildren: './pages/graphs/piechart/piechart.module#PiechartPageModule', canActivate: [AuthGuard] },
  { path: 'detail-payment', loadChildren: './pages/detail-payment/detail-payment.module#DetailPaymentPageModule' },
  { path: 'graphs/sankey', loadChildren: './pages/graphs/sankey/sankey.module#SankeyPageModule', canActivate: [AuthGuard] },
  { path: 'graphs/pareto', loadChildren: './pages/graphs/pareto/pareto.module#ParetoPageModule',canActivate:[AuthGuard] },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
