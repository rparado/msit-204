import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../shared/service/loading.service';
import { AppointmentService } from './service/appointment.service';
import { Doctors, Specialization } from './model/specialization';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { CalendarPage } from '../calendar/calendar.page';
import { DateService } from '../services/date.service';
import { ToastService } from '../services/toast.service';

@Component({
	selector: 'app-appointment',
	templateUrl: './appointment.page.html',
	styleUrls: ['./appointment.page.scss'],
})
export class AppointmentPage implements OnInit {
	specializations: Specialization[] = [];
	
	doctors: Doctors[] = [];

	loading: boolean = false;

	selectedSpecializationId: string = '';

	selectedDoctorId: string = '';

	selectedDate: string;

	appointForm = this.fb.group({
		specialization: ['', [Validators.required]],
		doctor: ['', [Validators.required]],
		appointmentDate: ['', [Validators.required]],
	});

	constructor(
		public loadingService: LoadingService,
		private appointmentService: AppointmentService,
		private modalCtrl: ModalController,
		private fb: FormBuilder,
		private dateService: DateService,
		private toastService: ToastService
	) { 

		this.selectedDate = new Date().toISOString(); 
	}

	

	ngOnInit() {
		this.getSpecializations();

		this.dateService.selectedDate$.subscribe(date => {
			if (date) {
				this.appointForm.patchValue({ appointmentDate: date });
			}
		});
	}
	getSpecializations() {
		this.loadingService.show();
		this.loading = true;
		this.appointmentService.getSpecializations()
			.subscribe((data: any) => {
				if(data) {
					this.hideLoading();
					this.specializations = [...this.specializations, ...data]; 
				}
			
			}, (err) => {
				console.log('err ', err)
				this.hideLoading();

			})
	}
	onSpecializationChange(event: any) {
		this.selectedSpecializationId = event.detail.value;

		this.getDoctor();
	}
	getDoctor() {
		this.loadingService.show();
		this.loading = true;
		this.appointmentService.getDoctors(this.selectedSpecializationId)
			.subscribe((data: any) => {
				if(data) {
					this.hideLoading();
					this.doctors = data; 
				}
			
			}, (err) => {
				this.hideLoading();

			})
	}

	onDoctorChange(event: any) {
		this.selectedDoctorId = event.detail.value;
	}

	
	async openDatePicker() {
		const modal = await this.modalCtrl.create({
			component: CalendarPage,

		});
		return await modal.present();
	}
	hideLoading() {
		this.loadingService.hide();
		this.loading = false;
	}

	onSubmit() {
		this.loadingService.show();
		this.loading = true;
		const formData: any = {
			"PatientID": localStorage.getItem('userId'),
			"DoctorID": this.selectedDoctorId,
			"SpecializationID": this.selectedSpecializationId,
			"AppointmentDate": this.selectedDate,
		}
		this.appointmentService.processAppointment(formData)
		.subscribe(data => {
			if(data) {
				this.hideLoading();
				this.toastService.successToast(data.message)
			}
		}, (err) => {
			this.hideLoading();
			this.toastService.errorToast(err.error.error)
		})
	}
}
