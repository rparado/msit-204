import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PatientServiceService } from './service/patient-service.service';
import { LoadingService } from '../shared/service/loading.service';
import { ToastService } from '../services/toast.service';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
	selector: 'app-patient',
	templateUrl: './patient.page.html',
	styleUrls: ['./patient.page.scss'],
})
export class PatientPage implements OnInit {
	loading: boolean = false;

	userProfile: any;

	size: number = 100;

	constructor(
		private patientService: PatientServiceService,
		public loadingService: LoadingService,
		private toastService: ToastService,
		private cdr: ChangeDetectorRef,
		private localStorageService: LocalStorageService
	) { }

	ngOnInit() {
		this.cdr.detectChanges();
		this.getProfile();
	}

	getProfile() {
		this.loadingService.show();
		this.loading = true;
		this.toastService.successToast('Loading data. Please wait...');

		this.patientService.getProfile()
		.subscribe((data: any) => {
			if(data) {
				this.loadingService.hide();
				this.loading = false;
				this.toastService.successToast('Profile fetched successfully!');
				this.userProfile = data;
			} else {
				this.loadingService.hide();
				this.loading = false;
			}

		}, (err) => {
			this.loadingService.hide();
			this.loading = false;
			this.toastService.errorToast(err.error.message)
		})
	}
	doRefresh(event: any) {
		this.localStorageService.doRefresh(event);
	}
}
