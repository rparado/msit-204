import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BillsPageRoutingModule } from './bills-routing.module';

import { BillsPage } from './bills.page';
import { SharedModule } from '../shared/shared.module';
import { TabPageModule } from '../shared/tab/tab.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BillsPageRoutingModule,
    SharedModule,
    TabPageModule
  ],
  declarations: [BillsPage]
})
export class BillsPageModule {}
