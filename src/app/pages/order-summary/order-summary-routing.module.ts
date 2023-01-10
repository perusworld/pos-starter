import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderSummaryPage } from './order-summary.page';

const routes: Routes = [
  {
    path: '',
    component: OrderSummaryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderSummaryPageRoutingModule {}
