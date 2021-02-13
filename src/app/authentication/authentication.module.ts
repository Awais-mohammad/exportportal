import { FooterComponentModule } from './../footer/footer.component.module';
import { HeaderComponentModule } from './../header/header.component.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthenticationPageRoutingModule } from './authentication-routing.module';
import { AuthenticationPage } from './authentication.page';
HeaderComponentModule

@NgModule({
  imports: [
    HeaderComponentModule,
    CommonModule,
    FormsModule,
    IonicModule,
    FooterComponentModule,
    AuthenticationPageRoutingModule
  ],
  declarations: [AuthenticationPage]
})
export class AuthenticationPageModule { }
