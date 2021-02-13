import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsadditionPage } from './productsaddition.page';

const routes: Routes = [
  {
    path: '',
    component: ProductsadditionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsadditionPageRoutingModule {}
