import {Component, Inject, OnInit} from '@angular/core';
import {OAuthService} from "angular-oauth2-oidc";
import {HttpClient} from "@angular/common/http";
import {APP_NAME} from "../../../app-tokens";
import {AppNameEnum} from "../../../app-name.enum";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-api-call',
  templateUrl: './api-call.component.html',
  styleUrls: ['./api-call.component.css']
})
export class ApiCallComponent implements OnInit {
  accessToken = '';

  response1 = '';
  response2 = '';

  appNameEnum = AppNameEnum;

  constructor(private oauthService: OAuthService, private httpClient: HttpClient, @Inject(APP_NAME) public appName: AppNameEnum) {
  }

  ngOnInit(): void {
    this.accessToken = this.oauthService.getAccessToken();
  }

  async runRequest1() {
    this.response1 = await this.runRequest(`${environment.api1Url}/data`);
  }

  async runRequest2() {
    this.response2 = await this.runRequest(`${environment.api2Url}/data`);
  }

  private runRequest(url: string) {
    return new Promise<string>((resolve) => {
      this.httpClient.get(url, {
        headers: {
          Authorization: 'Bearer ' + this.oauthService.getAccessToken()
        }
      }).subscribe(response => {
        resolve(JSON.stringify(response, null, 2));
      }, error => {
        resolve(JSON.stringify(error, null, 2));
      });
    })
  }
}
