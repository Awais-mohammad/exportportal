import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExportersListPage } from './exporters-list.page';

const routes: Routes = [
  {
    path: '',
    component: ExportersListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExportersListPageRoutingModule {}
