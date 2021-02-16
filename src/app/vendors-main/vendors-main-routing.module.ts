import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VendorsMainPage } from './vendors-main.page';

const routes: Routes = [
  {
    path: '',
    component: VendorsMainPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendorsMainPageRoutingModule {}
