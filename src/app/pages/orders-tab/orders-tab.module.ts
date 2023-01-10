import { NgModule } from '@angular/core';
import { OrdersTabPageRoutingModule } from './orders-tab-routing.module';

import { OrdersTabPage } from './orders-tab.page';
import { SharedModule } from 'src/app/shared/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    OrdersTabPageRoutingModule
  ],
  declarations: [OrdersTabPage]
})
export class OrdersTabPageModule {}
