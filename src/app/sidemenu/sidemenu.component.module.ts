import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SidemenuComponent } from './sidemenu.component';

@NgModule({
    imports: [CommonModule, FormsModule, IonicModule],
    declarations: [SidemenuComponent],
    exports: [SidemenuComponent]
})
export class SidemenuComponentmodule { }
