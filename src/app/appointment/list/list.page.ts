import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../service/appointment.service';
import { PatientServiceService } from 'src/app/patient/service/patient-service.service';
import { combineLatest, map } from 'rxjs';
import { Specialization } from '../model/specialization';

@Component({
	selector: 'app-list',
	templateUrl: './list.page.html',
	styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
	appointments: any;

	user: any;

	specailizations: any[] = [];

	appointmentDetail: any[] = [];
	
	selectedSpecializationID: string = '';

	doctors: any[] = [];

	constructor(
		private appointmentService: AppointmentService,
		private profileService: PatientServiceService,
	) { }

	ngOnInit() {
		this.getCombinedAPIData();
	}

	getCombinedAPIData() {
		const userId: any = localStorage.getItem('userId');
		const userProfile$ = this.profileService.getProfile();
		const appointmentDetail$ = this.appointmentService.getAppointments(userId);
		const specializations$ = this.appointmentService.getSpecializations();

		combineLatest([userProfile$, appointmentDetail$, specializations$]).pipe(
			map(([userProfile, appointmentDetail, specialization]) => {
				return {
					userProfile, appointmentDetail, specialization
				}
			})
		).subscribe(
			{
				next: (combinedResponse: any) => {
					this.user = combinedResponse.userProfile;
					this.appointmentDetail = combinedResponse.appointmentDetail
					this.specailizations = combinedResponse.specialization;

					const specializationIDs = new Set(this.appointmentDetail.map(appointment => appointment.SpecializationID));
					if (specializationIDs.size > 0) {
					  this.selectedSpecializationID = Array.from(specializationIDs)[0];
					  this.fetchDoctors(this.selectedSpecializationID);
					}
				},
				error: (error) => {
				  console.error('Error combining API calls:', error);
				}
			}
		)
	}

	fetchDoctors(specializationID: string) {
		this.appointmentService.getDoctors(specializationID)
		.subscribe((data: any) => {
			this.doctors = data;
		});
	}
}
