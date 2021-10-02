import {NgModule} from '@angular/core';
import {BrowserModule, Title} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {AuthConfig, OAuthModule, OAuthStorage} from "angular-oauth2-oidc";
import {HttpClientModule} from "@angular/common/http";
import {authCodeFlowConfig} from "./auth/auth.config";
import {AuthLocalStorageService} from "./auth/auth.localStorage.service";
import {APP_NAME, HEADER_BACKGROUND} from "./app-tokens";
import {environment} from "../environments/environment";
import { PageComponent } from './page/page.component';
import {LoginCompletedComponent} from "./pages/login-completed/login-completed.component";
import {LogoutCompletedComponent} from "./pages/logout-completed/logout-completed.component";
import {HomeComponent} from "./pages/protected/home/home.component";
import {LoginComponent} from "./pages/login/login.component";
import {UserInfoComponent} from "./pages/protected/user-info/user-info.component";
import {ApiCallComponent} from "./pages/protected/api-call/api-call.component";
import { LogoutComponent } from './pages/logout/logout.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginCompletedComponent,
    LogoutCompletedComponent,
    ApiCallComponent,
    HomeComponent,
    LoginComponent,
    UserInfoComponent,
    PageComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    OAuthModule.forRoot()
  ],
  providers: [
    Title,
    {
      provide: AuthConfig,
      useValue: authCodeFlowConfig
    },
    {
      provide: OAuthStorage,
      useClass: AuthLocalStorageService,
    },
    {
      provide: APP_NAME,
      useValue: environment.appName,
    },
    {
      provide: HEADER_BACKGROUND,
      useValue: environment.headerBackground,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
