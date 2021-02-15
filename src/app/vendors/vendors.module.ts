import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VendorsPageRoutingModule } from './vendors-routing.module';

import { VendorsPage } from './vendors.page';
import { HeaderComponentModule } from '../header/header.component.module';
import { FooterComponentModule } from '../footer/footer.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VendorsPageRoutingModule,
    HeaderComponentModule,
    FooterComponentModule,
  ],
  declarations: [VendorsPage]
})
export class VendorsPageModule {}
