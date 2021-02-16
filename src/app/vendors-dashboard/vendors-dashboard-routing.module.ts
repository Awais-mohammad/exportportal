import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VendorsDashboardPage } from './vendors-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: VendorsDashboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendorsDashboardPageRoutingModule {}
