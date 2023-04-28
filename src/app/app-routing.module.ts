import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'orders-tab',
    loadChildren: () => import('./pages/orders-tab/orders-tab.module').then(m => m.OrdersTabPageModule)
  },
  {
    path: 'menu-tab',
    loadChildren: () => import('./pages/menu-tab/menu-tab.module').then(m => m.MenuTabPageModule)
  },
  {
    path: 'sales-tab',
    loadChildren: () => import('./pages/sales-tab/sales-tab.module').then(m => m.SalesTabPageModule)
  },
  {
    path: 'select-item/:id',
    loadChildren: () => import('./pages/select-item/select-item.module').then(m => m.SelectItemPageModule)
  },
  {
    path: 'pay-order/:id',
    loadChildren: () => import('./pages/pay-order/pay-order.module').then(m => m.PayOrderPageModule)
  },
  {
    path: 'order-details/:id',
    loadChildren: () => import('./pages/order-details/order-details.module').then(m => m.OrderDetailsPageModule)
  },
  {
    path: 'confirm-order/:id',
    loadChildren: () => import('./pages/confirm-order/confirm-order.module').then(m => m.ConfirmOrderPageModule)
  },
  {
    path: 'order-summary/:id',
    loadChildren: () => import('./pages/order-summary/order-summary.module').then(m => m.OrderSummaryPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
