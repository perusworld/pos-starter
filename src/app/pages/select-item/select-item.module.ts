import { NgModule } from '@angular/core';
import { SelectItemPageRoutingModule } from './select-item-routing.module';

import { SelectItemPage } from './select-item.page';
import { SharedModule } from 'src/app/shared/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    SelectItemPageRoutingModule
  ],
  declarations: [SelectItemPage]
})
export class SelectItemPageModule { }
