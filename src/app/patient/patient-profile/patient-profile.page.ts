import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { CalendarPage } from 'src/app/calendar/calendar.page';
import { DateService } from 'src/app/services/date.service';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.page.html',
  styleUrls: ['./patient-profile.page.scss'],
})
export class PatientProfilePage implements OnInit {
	
	selectedDate: string;
	
	isModalOpen = false;

	constructor(
		private fb: FormBuilder,
		private modalCtrl: ModalController,
    	private dateService: DateService
	) { 
		this.selectedDate = new Date().toISOString(); 
	}

	ngOnInit() {

		this.dateService.selectedDate$.subscribe(date => {
			if (date) {
			  this.selectedDate = date;
			}
		  });
	}

	patientForm = this.fb.group({
		fname: ['', [Validators.required, Validators.minLength(1)]],
		lname: ['', [Validators.required, Validators.minLength(1)]],
		gender: ['', [Validators.required]],
		bday: ['', [Validators.required]],
		pnum: ['', [Validators.required]],
		addr: ['', [Validators.required]],
	});


	async openDatePicker() {
		const modal = await this.modalCtrl.create({
			component: CalendarPage
		});
		return await modal.present();
	}
	onUpdate() {
		
	}
}
