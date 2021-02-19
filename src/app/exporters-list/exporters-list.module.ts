import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExportersListPageRoutingModule } from './exporters-list-routing.module';

import { ExportersListPage } from './exporters-list.page';
import { FooterComponentModule } from '../footer/footer.component.module';
import { HeaderComponentModule } from '../header/header.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExportersListPageRoutingModule,
    HeaderComponentModule,
    FooterComponentModule
  ],
  declarations: [ExportersListPage]
})
export class ExportersListPageModule {}
