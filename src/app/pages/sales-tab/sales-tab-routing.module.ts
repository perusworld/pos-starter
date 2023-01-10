import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SalesTabPage } from './sales-tab.page';

const routes: Routes = [
  {
    path: '',
    component: SalesTabPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalesTabPageRoutingModule {}
