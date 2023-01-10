import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PayOrderPage } from './pay-order.page';

const routes: Routes = [
  {
    path: '',
    component: PayOrderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PayOrderPageRoutingModule {}
