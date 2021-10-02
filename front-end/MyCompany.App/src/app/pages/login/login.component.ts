import {Component, OnInit} from '@angular/core';
import {OAuthService} from "angular-oauth2-oidc";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private oauthService: OAuthService, private activatedRoute: ActivatedRoute) {
  }

  async ngOnInit() {
    const returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl ?? '/home';

    console.log('[Login] returnUrl', this.activatedRoute.snapshot.queryParams.returnUrl);

    await this.login(returnUrl);
  }

  async login(returnUrl: string) {
    await this.oauthService.loadDiscoveryDocument();
    this.oauthService.initLoginFlow(returnUrl);
  }
}
