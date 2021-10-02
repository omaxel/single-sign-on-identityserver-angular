using System.Collections.Generic;
using System.Security.Claims;
using System.Text.Json;
using IdentityModel;
using IdentityServer4;
using IdentityServer4.Models;
using IdentityServer4.Test;

namespace MyCompany.IdentityServer
{
    public static class SeedDataReader
    {
        public static IEnumerable<ApiScope> GetApiScopes() => new List<ApiScope>
        {
            new ApiScope(Scopes.Api1, "My API1"),
            new ApiScope(Scopes.Api2, "My API2")
        };

        public static IEnumerable<Client> GetClients(string clientApp1Url, string clientApp2Url) => new List<Client>
        {
            new Client
            {
                ClientId = "client1",

                // no interactive user, use the clientid/secret for authentication
                AllowedGrantTypes = GrantTypes.ClientCredentials,

                // secret for authentication
                ClientSecrets =
                {
                    new Secret("secret1".Sha256())
                },

                // scopes that client has access to
                AllowedScopes = { Scopes.Api1 }
            },
            new Client
            {
                ClientId = "client2",

                // no interactive user, use the clientid/secret for authentication
                AllowedGrantTypes = GrantTypes.ClientCredentials,

                // secret for authentication
                ClientSecrets =
                {
                    new Secret("secret2".Sha256())
                },

                // scopes that client has access to
                AllowedScopes = { Scopes.Api2 }
            },
            new Client
            {
                ClientId = "admin",

                // no interactive user, use the clientid/secret for authentication
                AllowedGrantTypes = GrantTypes.ClientCredentials,

                // secret for authentication
                ClientSecrets =
                {
                    new Secret("secret".Sha256())
                },

                // scopes that client has access to
                AllowedScopes = { Scopes.Api1, Scopes.Api2 }
            },
            new Client
            {
                ClientId = "clientapp1",
                AllowedGrantTypes = GrantTypes.Code,
                RequirePkce = true,
                RequireClientSecret = false,

                AllowOfflineAccess = true,
                AllowedScopes = { Scopes.Api1, "openid", "profile" },

                RedirectUris = new[]
                {
                    $"{clientApp1Url}/login-completed"
                },
                PostLogoutRedirectUris = new[]
                {
                    $"{clientApp1Url}/logout-completed"
                }
            },
            new Client
            {
                ClientId = "clientapp2",
                AllowedGrantTypes = GrantTypes.Code,
                RequirePkce = true,
                RequireClientSecret = false,

                AllowOfflineAccess = true,
                AllowedScopes = { Scopes.Api2, "openid", "profile" },

                RedirectUris = new[]
                {
                    $"{clientApp2Url}/login-completed"
                },
                PostLogoutRedirectUris = new[]
                {
                    $"{clientApp2Url}/logout-completed"
                }
            }
        };

        public static List<TestUser> GetUsers()
        {
            var address = new
            {
                street_address = "One Hacker Way",
                locality = "Heidelberg",
                postal_code = 69118,
                country = "Germany"
            };

            return new List<TestUser>
            {
                new TestUser
                {
                    SubjectId = "818727",
                    Username = "alice",
                    Password = "alice",
                    Claims =
                    {
                        new Claim(JwtClaimTypes.Name, "Alice Smith"),
                        new Claim(JwtClaimTypes.GivenName, "Alice"),
                        new Claim(JwtClaimTypes.FamilyName, "Smith"),
                        new Claim(JwtClaimTypes.Email, "AliceSmith@email.com"),
                        new Claim(JwtClaimTypes.EmailVerified, "true", ClaimValueTypes.Boolean),
                        new Claim(JwtClaimTypes.WebSite, "https://alice.com"),
                        new Claim(JwtClaimTypes.Address, JsonSerializer.Serialize(address),
                            IdentityServerConstants.ClaimValueTypes.Json)
                    }
                },
                new TestUser
                {
                    SubjectId = "88421113",
                    Username = "bob",
                    Password = "bob",
                    Claims =
                    {
                        new Claim(JwtClaimTypes.Name, "Bob Smith"),
                        new Claim(JwtClaimTypes.GivenName, "Bob"),
                        new Claim(JwtClaimTypes.FamilyName, "Smith"),
                        new Claim(JwtClaimTypes.Email, "BobSmith@email.com"),
                        new Claim(JwtClaimTypes.EmailVerified, "true", ClaimValueTypes.Boolean),
                        new Claim(JwtClaimTypes.WebSite, "https://bob.com"),
                        new Claim(JwtClaimTypes.Address, JsonSerializer.Serialize(address),
                            IdentityServerConstants.ClaimValueTypes.Json)
                    }
                }
            };
        }
    }
}