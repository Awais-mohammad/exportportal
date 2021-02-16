import { FooterComponentModule } from './../footer/footer.component.module';
import { HeaderComponentModule } from './../header/header.component.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VendorsMainPageRoutingModule } from './vendors-main-routing.module';

import { VendorsMainPage } from './vendors-main.page';

@NgModule({
  imports: [
    CommonModule,
    HeaderComponentModule,
    FooterComponentModule,
    FormsModule,
    IonicModule,
    VendorsMainPageRoutingModule
  ],
  declarations: [VendorsMainPage]
})
export class VendorsMainPageModule { }
