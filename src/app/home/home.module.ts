
import { FooterComponentModule } from './../footer/footer.component.module';
import { FooterComponent } from './../footer/footer.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { HeaderComponentModule } from '../header/header.component.module';
import { ExporterPage } from './../exporter/exporter.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    HeaderComponentModule,
    FooterComponentModule,
   

  ],
  declarations: [HomePage],
  entryComponents: [ExporterPage]
})
export class HomePageModule { }
