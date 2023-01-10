import { NgModule } from '@angular/core';
import { OrderSummaryPageRoutingModule } from './order-summary-routing.module';

import { OrderSummaryPage } from './order-summary.page';
import { SharedModule } from 'src/app/shared/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    OrderSummaryPageRoutingModule
  ],
  declarations: [OrderSummaryPage]
})
export class OrderSummaryPageModule {}
