import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExporterPage } from './exporter.page';

const routes: Routes = [
  {
    path: '',
    component: ExporterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExporterPageRoutingModule {}
