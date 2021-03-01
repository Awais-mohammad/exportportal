import { ExporterPage } from './../exporter/exporter.page';
import { HeaderComponentModule } from './../header/header.component.module';
import { FooterComponentModule } from './../footer/footer.component.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VendorsDashboardPageRoutingModule } from './vendors-dashboard-routing.module';

import { VendorsDashboardPage } from './vendors-dashboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FooterComponentModule,
    HeaderComponentModule,
    VendorsDashboardPageRoutingModule
  ],
  declarations: [VendorsDashboardPage],
  entryComponents: [ExporterPage]
})
export class VendorsDashboardPageModule { }
