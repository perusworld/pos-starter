import { NgModule } from '@angular/core';
import { MenuTabPageRoutingModule } from './menu-tab-routing.module';

import { MenuTabPage } from './menu-tab.page';
import { SharedModule } from 'src/app/shared/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    MenuTabPageRoutingModule
  ],
  declarations: [MenuTabPage]
})
export class MenuTabPageModule {}
