import { NgModule } from '@angular/core';
import { ConfirmOrderPageRoutingModule } from './confirm-order-routing.module';

import { ConfirmOrderPage } from './confirm-order.page';
import { SharedModule } from 'src/app/shared/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    ConfirmOrderPageRoutingModule
  ],
  declarations: [ConfirmOrderPage]
})
export class ConfirmOrderPageModule {}
