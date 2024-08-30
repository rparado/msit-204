import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PatientProfilePageRoutingModule } from './patient-profile-routing.module';

import { PatientProfilePage } from './patient-profile.page';
import { SharedModule } from '../../shared/shared.module';
import { TabPageModule } from 'src/app/shared/tab/tab.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PatientProfilePageRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    TabPageModule
  ],
  declarations: [PatientProfilePage]
})
export class PatientProfilePageModule {}
