import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../shared/service/loading.service';
import { AppointmentService } from './service/appointment.service';
import { Specialization } from './model/specialization';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
	selector: 'app-appointment',
	templateUrl: './appointment.page.html',
	styleUrls: ['./appointment.page.scss'],
})
export class AppointmentPage implements OnInit {
	specializations: Specialization[] = [];

	loading: boolean = false;

	appointForm = this.fb.group({
		specialization: ['', [Validators.required, Validators.minLength(1)]],
		doctor: ['', [Validators.required, Validators.minLength(1)]],
		appointmentDate: ['', [Validators.required]],
	});

	constructor(
		public loadingService: LoadingService,
		private appointmentService: AppointmentService,
		private fb: FormBuilder,
	) { }

	

	ngOnInit() {
		this.getSpecializations();
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
	hideLoading() {
		this.loadingService.hide();
		this.loading = false;
	}
}
