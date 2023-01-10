import { NgModule } from '@angular/core';

import { SalesTabPageRoutingModule } from './sales-tab-routing.module';

import { SalesTabPage } from './sales-tab.page';
import { SharedModule } from 'src/app/shared/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    SalesTabPageRoutingModule
  ],
  declarations: [SalesTabPage]
})
export class SalesTabPageModule {}
