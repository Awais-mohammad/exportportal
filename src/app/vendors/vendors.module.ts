import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { VendorsPageRoutingModule } from './vendors-routing.module';

import { VendorsPage } from './vendors.page';
import { HeaderComponentModule } from '../header/header.component.module';
import { FooterComponentModule } from '../footer/footer.component.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VendorsPageRoutingModule,
    HeaderComponentModule,
    FooterComponentModule,
    ReactiveFormsModule,
  ],
  declarations: [VendorsPage]
})
export class VendorsPageModule {}
