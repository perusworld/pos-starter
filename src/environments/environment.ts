// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apps: [
    {
      name: 'Any Donalds',
      menu: 'fast-food-menu',
      admin: true,
      user: true,
    },
    {
      name: 'Any Mart',
      menu: 'ecom-products',
      admin: false,
      user: true,
    }
  ],
  timeZone: 'America/Los_Angeles',
  currency: 'USD',
  tax: 9.5,
  demo: {
    cardHolderName: 'John Doe',
    cardNumber: '5555555555554444',
    cardCVCCode: '123',
  },
  qrPrefix: 'https://qr.somewhere.com/',
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
