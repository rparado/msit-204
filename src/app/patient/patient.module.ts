import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PatientPageRoutingModule } from './patient-routing.module';

import { PatientPage } from './patient.page';
import { SharedModule } from '../shared/shared.module';
import { TabPageModule } from '../shared/tab/tab.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PatientPageRoutingModule,
    SharedModule,
    TabPageModule
  ],
  declarations: [PatientPage]
})
export class PatientPageModule {}
