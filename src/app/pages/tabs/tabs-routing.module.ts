import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'orders',
        loadChildren: () => import('../orders-tab/orders-tab.module').then(m => m.OrdersTabPageModule)
      },
      {
        path: 'menu',
        loadChildren: () => import('../menu-tab/menu-tab.module').then(m => m.MenuTabPageModule)
      },
      {
        path: 'sales',
        loadChildren: () => import('../sales-tab/sales-tab.module').then(m => m.SalesTabPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/orders',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/orders',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
