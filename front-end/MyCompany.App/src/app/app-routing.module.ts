import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "./auth/auth.guard";
import {PageComponent} from "./page/page.component";
import {LogoutCompletedComponent} from "./pages/logout-completed/logout-completed.component";
import {LoginComponent} from "./pages/login/login.component";
import {HomeComponent} from "./pages/protected/home/home.component";
import {LoginCompletedComponent} from "./pages/login-completed/login-completed.component";
import {ApiCallComponent} from "./pages/protected/api-call/api-call.component";
import {UserInfoComponent} from "./pages/protected/user-info/user-info.component";
import {LogoutComponent} from "./pages/logout/logout.component";

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home',},

  {path: 'login', component: LoginComponent},
  {path: 'login-completed', component: LoginCompletedComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'logout-completed', component: LogoutCompletedComponent},

  {
    path: '',
    component: PageComponent,
    canActivate: [AuthGuard],
    children: [
      {path: 'home', component: HomeComponent},
      {path: 'api-call', component: ApiCallComponent},
      {path: 'user-info', component: UserInfoComponent},
    ]
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
