import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AppointmentService } from '../service/appointment.service';
import { PatientServiceService } from 'src/app/patient/service/patient-service.service';
import { combineLatest, map, Subscription } from 'rxjs';
import { Specialization } from '../model/specialization';
import { LoadingService } from 'src/app/shared/service/loading.service';
import { ToastService } from 'src/app/services/toast.service';
import { Router } from '@angular/router';
import { BillService } from 'src/app/bills/service/bill.service';
import { Bill } from 'src/app/bills/model/bill';
import { LocalStorageService } from 'src/app/services/local-storage.service';

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

	bills: Bill[] = [];


	constructor(
		private appointmentService: AppointmentService,
		private profileService: PatientServiceService,
		public loadingService: LoadingService,
		private toastService: ToastService,
		private router: Router,
		private cdr: ChangeDetectorRef,
		private localStorageService: LocalStorageService
	) { }

	ngOnInit() {
		this.cdr.detectChanges();
		this.getCombinedAPIData();

	}
	ionViewWillEnter() {
		this.getCombinedAPIData();
	}
	hideLoading() {
		this.loadingService.hide();
		this.loading = false;
	}

	getCombinedAPIData() {
		this.loadingService.show();
		this.loading = true;
		this.toastService.successToast('Loading data. Please wait...');

		const currentDate = new Date();

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
					this.hideLoading();
					this.toastService.successToast('Data successfully loaded.');

					this.user = combinedResponse.userProfile;
					this.appointmentDetail = combinedResponse.appointmentDetail
					this.specailizations = combinedResponse.specialization;

					this.appointmentDetail = this.appointmentDetail.map((appointment:any) => {
						const appointmentDate = new Date(appointment.AppointmentDate);
						return {
						  ...appointment,
						  status: appointmentDate > currentDate ? 'Upcoming' : 'Completed'
						};
					  });
				},
				error: (error) => {
					this.toastService.errorToast('Error in processing request!');
					this.noAppointpoint = true;
				  	setTimeout(() =>  {
						return this.router.navigateByUrl('/appointment');
					}, 2000)
				}
			}
		)
	}
	payAppointment(billingId: string) {
		this.router.navigateByUrl('/bills');
		localStorage.setItem('billid', billingId);
		
	}

	doRefresh(event: any) {
		this.localStorageService.doRefresh(event);
	}

	
}
