import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { CalendarPage } from 'src/app/calendar/calendar.page';
import { DateService } from 'src/app/services/date.service';
import { PatientServiceService } from '../service/patient-service.service';
import { LoadingService } from 'src/app/shared/service/loading.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.page.html',
  styleUrls: ['./patient-profile.page.scss'],
})
export class PatientProfilePage implements OnInit {
	
	selectedDate: string;

	loading: boolean = false;

	constructor(
		private fb: FormBuilder,
		private modalCtrl: ModalController,
    	private dateService: DateService,
		private patientService: PatientServiceService,
		public loadingService: LoadingService,
		private toastService: ToastService
	) { 
		this.selectedDate = new Date().toISOString(); 
	}

	ngOnInit() {

		this.dateService.selectedDate$.subscribe(date => {
			if (date) {
				this.patientForm.patchValue({ bday: date });
			}
		});
	}

	patientForm = this.fb.group({
		fname: ['', [Validators.required, Validators.minLength(2)]],
		lname: ['', [Validators.required, Validators.minLength(2)]],
		gender: ['', [Validators.required]],
		bday: ['', [Validators.required]],
		pnum: ['', [Validators.required, numericValidator]],
		addr: [''],
	});


	async openDatePicker() {
		const modal = await this.modalCtrl.create({
			component: CalendarPage,

		});
		return await modal.present();
	}
	onUpdate() {

		this.loadingService.show();
		this.loading = true;

		const formData = this.patientForm.value;

		const data:any = {
			FirstName: formData?.fname,
			LastName: formData.lname,
			Gender: formData.gender,
			BirthDate: formData.bday,
			ContactInfo: formData.pnum,
			Address: formData.addr,
			UserID: localStorage.getItem("userId")
		}

		this.patientService.updateProfile(data)
			.subscribe(async(data:any) => {
				if(data) {
					this.hideLoading();
					this.toastService.successToast(data.message)
				}
			}, (err) => {
				this.toastService.errorToast(err.error.message)
			})
	}
	hideLoading() {
		this.loadingService.hide();
		this.loading = false;
	}
	
}

function numericValidator(control: AbstractControl): { [key: string]: boolean } | null {
	const valid = /^\d+$/.test(control.value);
	return valid ? null : { numeric: true };
  }
