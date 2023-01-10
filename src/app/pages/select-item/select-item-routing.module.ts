import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectItemPage } from './select-item.page';

const routes: Routes = [
  {
    path: '',
    component: SelectItemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectItemPageRoutingModule {}
