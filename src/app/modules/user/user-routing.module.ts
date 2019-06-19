import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./services/authguard.service";
import { CanActivate } from "@angular/router/src/utils/preactivation";

const routes: Routes = [
  {
    path: "user/profile",
    loadChildren: "./pages/profile/profile.module#ProfilePageModule",
    canActivate: [AuthGuard]
  },
  {
    path: "user/signup",
    loadChildren: "./pages/signup/signup.module#SignupPageModule"
  },
  {
    path: "user/login",
    loadChildren: "./pages/login/login.module#LoginPageModule"
  },
  {
    path: "reset-password",
    loadChildren:
      "./pages/reset-password/reset-password.module#ResetPasswordPageModule"
  },
  {
    path: "users",
    loadChildren: "./pages/users/users.module#UsersPageModule",
    canActivate: [AuthGuard]
  },
  {
    path: "user/edit-user/:key",
    loadChildren: "./pages/edit-user/edit-user.module#EditUserPageModule",
    canActivate: [AuthGuard]
  },
  {
    path: "user/not-authorized/:message",
    loadChildren:
      "./pages/not-authorized/not-authorized.module#NotAuthorizedPageModule"
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
