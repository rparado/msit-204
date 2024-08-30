import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListPageRoutingModule } from './list-routing.module';

import { ListPage } from './list.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { FilterSpecializationPipe } from '../pipe/filter-specialization.pipe';
import { FilterDoctorPipe } from '../pipe/filter-doctor.pipe';
import { TabPageModule } from 'src/app/shared/tab/tab.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListPageRoutingModule,
    SharedModule,
    FilterSpecializationPipe,
    FilterDoctorPipe,
    TabPageModule
  ],
  declarations: [ListPage]
})
export class ListPageModule {}
