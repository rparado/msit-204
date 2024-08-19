import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    {
        path: 'patients',
        loadChildren: () => import('./patient/patient.module').then(m => m.PatientModule)
      },
];
