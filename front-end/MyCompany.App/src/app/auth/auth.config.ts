import {AuthConfig} from 'angular-oauth2-oidc';
import {environment} from "../../environments/environment";

const {auth} = environment;

export const authCodeFlowConfig: AuthConfig = {
  issuer: auth.issuer,

  redirectUri: `${auth.selfUrl}/login-completed`,
  postLogoutRedirectUri: `${auth.selfUrl}/logout-completed`,

  clientId: auth.clientId,
  responseType: 'code',
  scope: auth.scope,
  showDebugInformation: !environment.production
};
