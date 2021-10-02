import {environment as baseEnv} from "./environment.app1";

export const environment = {
  ...baseEnv,

  production: true,
  api1Url: '<API1_URL>',
  api2Url: '<API2_URL>',

  auth: {
    ...baseEnv.auth,
    issuer: '<ISSUER_URL>',
    selfUrl: '<SELF_URL>',
  }
};
