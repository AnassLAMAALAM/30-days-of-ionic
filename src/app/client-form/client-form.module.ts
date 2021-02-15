import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientFormPageRoutingModule } from './client-form-routing.module';

import { ClientFormPage } from './client-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ClientFormPageRoutingModule
  ],
  declarations: [ClientFormPage]
})
export class ClientFormPageModule {}
