import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header.component';
import { LoginPage } from '../login/login.page';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule],
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
})
export class HeaderComponentModule {}
