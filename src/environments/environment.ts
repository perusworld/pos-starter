// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  posAppName: 'Any Donalds',
  timeZone: 'America/Los_Angeles',
  menu: 'fast-food-menu',
  currency: 'USD',
  tax: 9.5,
  demo: {
    cardHolderName: 'John Doe',
    cardNumber: '5555555555554444',
    cardCVCCode: '123',
  },
  features: {
    showHeader: true,
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
