import { Component, OnInit } from '@angular/core';
import {OAuthService} from "angular-oauth2-oidc";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private oauthService: OAuthService) { }

  async ngOnInit() {
    await this.oauthService.loadDiscoveryDocument();
    await this.oauthService.revokeTokenAndLogout();
  }

}
