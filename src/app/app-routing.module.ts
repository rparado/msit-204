import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'login',
		pathMatch: 'full'
	},
	{
		path: 'login',
		loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),

	},
	{
		path: 'register',
		loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule),

	},
	{
		path: 'patient',
		loadChildren: () => import('./patient/patient.module').then( m => m.PatientPageModule),
		canActivate: [AuthGuard]
	},
	{
		path: 'patient/patient-profile',
		loadChildren: () => import('./patient/patient-profile/patient-profile.module').then( m => m.PatientProfilePageModule),
		canActivate: [AuthGuard]
	},
	{
		path: 'doctor',
		loadChildren: () => import('./doctor/doctor.module').then( m => m.DoctorPageModule)
	},
	{
		path: 'calendar',
		loadChildren: () => import('./calendar/calendar.module').then( m => m.CalendarPageModule)
	},
	{
		path: 'appointment',
		loadChildren: () => import('./appointment/appointment.module').then( m => m.AppointmentPageModule)
	},
	{
		path: 'appointment/list',
		loadChildren: () => import('./appointment/list/list.module').then( m => m.ListPageModule)
	},
  {
    path: 'tab',
    loadChildren: () => import('./shared/tab/tab.module').then( m => m.TabPageModule)
  },
  {
    path: 'bills',
    loadChildren: () => import('./bills/bills.module').then( m => m.BillsPageModule)
  },
];

@NgModule({
	imports: [
	RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
	],
	exports: [RouterModule]
})
export class AppRoutingModule { }
