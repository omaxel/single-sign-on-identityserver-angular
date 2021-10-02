# Single Sign-on (SSO) with IdentityServer and Angular
This example demonstrates how a fake company - named *MyCompany* - can implement SSO to centralize login for internal applications.

The platform is made up of the following components.
- IdentityServer
- Api1
- Api2
- ClientApp1
- ClientApp2

## IdentityServer
This in an implementation of [IdentityServer4](https://identityserver4.readthedocs.io/en/latest) based on [.NET 5](https://dotnet.microsoft.com/download/dotnet/5.0). It provides centralized authentication and authorization for *MyCompany*'s applications, following the [OIDC](https://openid.net/connect/) and [OAuth 2.0](https://oauth.net/2/) standards.

Both users and service accounts (aka service-to-service communication) can take advantage of this login system.

*Project path in the repo:* *back-end/MyCompany.IdentityServer*. Included in the *MyCompany.sln* solution.

### Data and persistence
There's no database where data is stored since this is an example project. Users and other data are hard-coded in the *SeedDataReader.cs* file.


### Scopes
[Scopes](https://identityserver.github.io/Documentation/docsv2/overview/terminology.html) are identifiers for resources that a client wants to access. This identifier is sent to IdentityServer during authentication or token request.

#### API scopes
The available scopes are hard-coded in the *Scopes.cs* file and are defined as:

- **api1**: it allows access to the Api1 resource.
- **api2**: it allows access to the Api2 resource.

#### Identity scopes
Identity scopes allow accessing information about a user. The default ones are used: *openid*, *profile*, and *offline_access*.

### Users
| Username | Password |
|----------|----------|
| alice    | alice    |
| bob      | bob      |

### Client applications
| ID         | Secret  | OAuth flow         | Allowed scopes                        |
|------------|---------|--------------------|---------------------------------------|
| client1    | secret1 | Client credentials | api1                                  |
| client2    | secret2 | Client credentials | api2                                  |
| admin      | secret  | Client credentials | api1, api2                            |
| clientapp1 | N/A     | Auth Code + PKCE   | api1, openid, profile, offline_access |
| clientapp2 | N/A     | Auth Code + PKCE   | api2, openid, profile, offline_access |

You have to configure the URL of *clientapp1* and *clientapp2* by setting the *ClientApp1Url* and *ClientApp2Url* settings in the *appsettings.{environment}.json* file. Those values will be used to configure the login and logout redirect URL for the client applications.

## Api (Api1 and Api2)
**Before you read on:** there's only one VS project for both Api1 and Api2 and it's called *MyCompany.Api*. This allows to easily replicate features and configurations. You can run each Api by using the related launch profile.

*Project path in the repo:* *back-end/MyCompany.Api*. Included in the *MyCompany.sln* solution.

This API project, based on .NET Core 5, exposes the `/data` endpoint which returns a simple JSON object with a message based on the current running Api.

All endpoints require authentication using a *Bearer* token. The latter must hold the scope for the related API:
- *api1* to call the API when running the *MyCompany.Api1* launch profile;
- *api2* to call the API when running the *MyCompany.Api2* launch profile.

Check out the [Client applications](#client-applications) section for clients that are enabled to request which Api scope.

## ClientApp (ClientApp1 & ClientApp2)
**Before you read on:** there's only one project for both ClientApp1 and ClientApp2 and it's called *MyCompany.App*. This allows to easily replicate features and configurations. You can run each application by using the related run script.

*Project path in the repo:* *front-end/MyCompany.App*.

This is an Angular-based front-end application that requires authentication in order to navigate it.

The user is redirected to the IdentityServer's login page if he didn't log in before. The user needs to type username and password only if there wasn't an active session. On login completed, the user is redirected back to the application with the authorization code which is exchanged for the access token as required by the [Authotization Code Flow with PKCE](https://auth0.com/docs/authorization/flows/authorization-code-flow-with-proof-key-for-code-exchange-pkce).

The access token is then used to obtain information about the user and to fetch data from the API.

When obtaining the token, the application specifies which resources it needs access to. The *ClientApp1* requests the *api1* scope and it can access *Api1*, while *ClientApp2* requests the *api2* scope and it can access *Api2*. Check out the [Client applications](#client-applications) sections for more information.

You can start the *ClientApp1* by running the *app1:start* NPM script and the *ClientApp2* by running the *app2:start* NPM script.

Use the *environment.{appName}.ts* file to configure options for the specific application.