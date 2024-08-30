import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../service/appointment.service';
import { PatientServiceService } from 'src/app/patient/service/patient-service.service';
import { combineLatest, map } from 'rxjs';

@Component({
	selector: 'app-list',
	templateUrl: './list.page.html',
	styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
	appointments: any;

	user: any;

	appointmentDetail: any[] = [];
	
	constructor(
		private appointmentService: AppointmentService,
		private profileService: PatientServiceService,
	) { }

	ngOnInit() {
		this.getCombinedAPIData();
	}

	// getAppointments() {
	// 	this.appointmentService.getAppointments()
	// 		.subscribe(data => {
	// 			console.log('data ', data)
	// 		})
	// }
	// getUserProfile() {
	// 	this.profileService.getProfile()
	// 		.subscribe(data => {

	// 			console.log('user ', data)
	// 		})
	// }

	getCombinedAPIData() {
		const userProfile$ = this.profileService.getProfile();
		const appointmentDetail$ = this.appointmentService.getAppointments();

		combineLatest([userProfile$, appointmentDetail$]).pipe(
			map(([userProfile, appointmentDetail]) => {
				return {
					userProfile, appointmentDetail
				}
			})
		).subscribe(
			{
				next: (combinedResponse: any) => {
					console.log('Combined API responses:', combinedResponse);
					this.user = combinedResponse.userProfile;
					this.appointmentDetail = combinedResponse.appointmentDetail
				},
				error: (error) => {
				  console.error('Error combining API calls:', error);
				}
			}
		)
	}
}
