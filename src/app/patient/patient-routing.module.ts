import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatientPage } from './patient.page';

const routes: Routes = [
  {
    path: '',
    component: PatientPage
  },  {
    path: 'patient-profile',
    loadChildren: () => import('./patient-profile/patient-profile.module').then( m => m.PatientProfilePageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientPageRoutingModule {}
