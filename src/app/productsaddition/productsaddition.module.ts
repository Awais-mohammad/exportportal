import { FooterComponentModule } from './../footer/footer.component.module';
import { HeaderComponentModule } from './../header/header.component.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductsadditionPageRoutingModule } from './productsaddition-routing.module';

import { ProductsadditionPage } from './productsaddition.page';

@NgModule({
  imports: [
    CommonModule,
    FooterComponentModule,
    FormsModule,
    IonicModule,
    HeaderComponentModule,
    ProductsadditionPageRoutingModule
  ],
  declarations: [ProductsadditionPage]
})
export class ProductsadditionPageModule { }
