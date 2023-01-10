import { NgModule } from '@angular/core';
import { PayOrderPageRoutingModule } from './pay-order-routing.module';

import { PayOrderPage } from './pay-order.page';
import { SharedModule } from 'src/app/shared/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    PayOrderPageRoutingModule
  ],
  declarations: [PayOrderPage]
})
export class PayOrderPageModule {}
