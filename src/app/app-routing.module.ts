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

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
