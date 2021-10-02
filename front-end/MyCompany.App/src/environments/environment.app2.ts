export const environment = {
  production: false,

  appName: 'App2',
  headerBackground: '#3c005c',

  api1Url: 'https://localhost:44301',
  api2Url: 'https://localhost:44302',

  auth: {
    issuer: 'https://localhost:44300',
    selfUrl: 'http://localhost:4202',
    clientId: 'clientapp2',
    scope: 'openid profile offline_access api2'
  }
};
