export const environment = {
  production: true,
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
    showFooter: true,
  },
};
