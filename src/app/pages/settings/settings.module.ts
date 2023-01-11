import { NgModule } from '@angular/core';
import { SettingsPageRoutingModule } from './settings-routing.module';

import { SettingsPage } from './settings.page';
import { SharedModule } from 'src/app/shared/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    SettingsPageRoutingModule
  ],
  declarations: [SettingsPage]
})
export class SettingsPageModule {}
