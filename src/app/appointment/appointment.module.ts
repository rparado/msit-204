import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AppointmentPageRoutingModule } from './appointment-routing.module';

import { AppointmentPage } from './appointment.page';
import { SharedModule } from '../shared/shared.module';
import { TabPageModule } from '../shared/tab/tab.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AppointmentPageRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    TabPageModule
  ],
  declarations: [AppointmentPage]
})
export class AppointmentPageModule {}
