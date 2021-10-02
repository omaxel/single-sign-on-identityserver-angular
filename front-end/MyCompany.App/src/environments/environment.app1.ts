export const environment = {
  production: false,

  appName: 'App1',
  headerBackground: '#212529',

  api1Url: 'https://localhost:44301',
  api2Url: 'https://localhost:44302',

  auth: {
    issuer: 'https://localhost:44300',
    selfUrl: 'http://localhost:4201',
    clientId: 'clientapp1',
    scope: 'openid profile offline_access api1'
  }
};
