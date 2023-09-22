import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'confirm-order/:id',
    loadComponent: () => import('./pages/confirm-order/confirm-order.page').then( m => m.ConfirmOrderPage)
  },
  {
    path: 'menu-tab',
    loadComponent: () => import('./pages/menu-tab/menu-tab.page').then( m => m.MenuTabPage)
  },
  {
    path: 'order-details/:id',
    loadComponent: () => import('./pages/order-details/order-details.page').then( m => m.OrderDetailsPage)
  },
  {
    path: 'order-summary/:id',
    loadComponent: () => import('./pages/order-summary/order-summary.page').then( m => m.OrderSummaryPage)
  },
  {
    path: 'orders-tab',
    loadComponent: () => import('./pages/orders-tab/orders-tab.page').then( m => m.OrdersTabPage)
  },
  {
    path: 'pay-order/:id',
    loadComponent: () => import('./pages/pay-order/pay-order.page').then( m => m.PayOrderPage)
  },
  {
    path: 'sales-tab',
    loadComponent: () => import('./pages/sales-tab/sales-tab.page').then( m => m.SalesTabPage)
  },
  {
    path: 'select-item/:id',
    loadComponent: () => import('./pages/select-item/select-item.page').then( m => m.SelectItemPage)
  },
  {
    path: 'tabs',
    loadComponent: () => import('./pages/tabs/tabs.page').then( m => m.TabsPage),
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'orders',
      },
      {
        path: 'orders',
        loadComponent: () => import('./pages/orders-tab/orders-tab.page').then( m => m.OrdersTabPage)
      },
      {
        path: 'menu',
        loadComponent: () => import('./pages/menu-tab/menu-tab.page').then( m => m.MenuTabPage)
      },
      {
        path: 'sales',
        loadComponent: () => import('./pages/sales-tab/sales-tab.page').then( m => m.SalesTabPage)
      },
    ]
  },
  {
    path: 'settings',
    loadComponent: () => import('./pages/settings/settings.page').then( m => m.SettingsPage)
  },
  {
    path: 'landing',
    loadComponent: () => import('./pages/landing/landing.page').then( m => m.LandingPage)
  },
];
