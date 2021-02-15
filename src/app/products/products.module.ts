import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductsPageRoutingModule } from './products-routing.module';

import { ProductsPage } from './products.page';
import { HeaderComponentModule } from '../header/header.component.module';
import { FooterComponentModule } from '../footer/footer.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductsPageRoutingModule,
    HeaderComponentModule,
    FooterComponentModule,
  ],
  declarations: [ProductsPage]
})
export class ProductsPageModule {}
