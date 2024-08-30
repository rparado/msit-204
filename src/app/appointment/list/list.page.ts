import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../service/appointment.service';
import { PatientServiceService } from 'src/app/patient/service/patient-service.service';
import { combineLatest, map } from 'rxjs';
import { Specialization } from '../model/specialization';
import { LoadingService } from 'src/app/shared/service/loading.service';
import { ToastService } from 'src/app/services/toast.service';
import { Router } from '@angular/router';

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

	loading: boolean = false;

	noAppointpoint: boolean = false;

	isPaid: boolean = false;

	constructor(
		private appointmentService: AppointmentService,
		private profileService: PatientServiceService,
		public loadingService: LoadingService,
		private toastService: ToastService,
		private router: Router
	) { }

	ngOnInit() {
		this.getCombinedAPIData();
	}
	hideLoading() {
		this.loadingService.hide();
		this.loading = false;
	}

	getCombinedAPIData() {
		this.loadingService.show();
		this.loading = true;
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
					this.noAppointpoint = false;
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
					this.toastService.errorToast(error.error.message);
					this.noAppointpoint = true;
				  	setTimeout(() =>  {
						return this.router.navigateByUrl('/appointment');
					}, 2000)
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

	payAppointment(billingId: string) {
		localStorage.setItem('billid', billingId);
		this.appointmentService.payAppointment(billingId)
			.subscribe((data: any) => {
				if(data) {
					this.isPaid = true;
					this.toastService.successToast(data.message)
				} else {
					this.isPaid = false;
				}
				
			},(err) => {
				console.log('err ', err);
				this.toastService.successToast(err.error.message)
			})
	}
}
