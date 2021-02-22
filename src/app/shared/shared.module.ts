import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ExporterPage } from '../exporter/exporter.page';
import { LoginPage } from '../login/login.page';

@NgModule({
  declarations: [ExporterPage,],
  imports: [IonicModule,
    FormsModule,
    CommonModule,
  ],
  exports: [ExporterPage,]
})
export class SharedModule { }
