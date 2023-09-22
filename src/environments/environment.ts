// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apps: [
    {
      name: 'Any Donalds',
      menu: 'fast-food-menu',
      title: 'Your one-stop destination for delicious fast food!',
      description: `At Fast Bites, we're passionate about serving up mouthwatering burgers, crispy fries, and more. 
      Whether you're in a hurry or looking for a quick and tasty meal, we've got you covered. Explore our menu, place an order, 
      and experience the joy of fast food done right.`,
      orderConfirm: 'Thank you for your purchase, your order is being prepared.',
      admin: true,
      user: true,
      cardInput: true,
      cardTap: true,
      scanPay: true,
    },
    {
      name: 'Any Mart',
      menu: 'ecom-products',
      title: 'Your one-stop online shopping destination!.',
      description: `Discover a world of amazing products and unbeatable deals. Whether you're searching for the latest fashion trends, 
      cutting-edge electronics, or unique gifts, we've got you covered. Start shopping now to explore our extensive catalog and enjoy a 
      seamless online shopping experience!.`,
      orderConfirm: 'Thank you, your order is being prepared for shipment.',
      admin: false,
      user: true,
      cardInput: true,
      cardTap: false,
      scanPay: true,
    },
    {
      name: 'Any Shoe',
      menu: 'shoe-products',
      title: 'Your one-stop destination for stylish and comfortable footwear!.',
      description: `Discover a wide range of trendy shoes for every occasion. Whether you're looking for athletic sneakers, elegant
      heels, or casual loafers, we've got you covered. Our carefully curated collection features the latest fashion
      trends and high-quality brands, ensuring you'll find the perfect pair for any outfit.`,
      orderConfirm: 'Thank you, your order is being prepared for shipment.',
      admin: false,
      user: true,
      cardInput: true,
      cardTap: false,
      scanPay: true,
    }
  ],
  defaultApp: -1,
  defaultAppAdmin: false,
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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
