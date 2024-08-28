import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.page.html',
  styleUrls: ['./patient-profile.page.scss'],
})
export class PatientProfilePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  // @ViewChild('calendar', { static: false }) calendar: any;

	// selectedDate: string;

	// registerForm = this.fb.group({
	// 	fname: ['', [Validators.required, Validators.minLength(1)]],
	// 	lname: ['', [Validators.required, Validators.minLength(1)]],
	// 	gender: ['', [Validators.required, Validators.minLength(1)]],
	// 	bday: ['', [Validators.required, Validators.minLength(1)]],
	// 	pnum: ['', [Validators.required, Validators.minLength(1)]],
	// 	addr: ['', [Validators.required, Validators.minLength(1)]],
	// 	username: ['', [Validators.required, Validators.minLength(1)]],
	// 	password: ['', [Validators.required, Validators.minLength(1)]]
	// });

	// showCalendar: boolean = false;

	

	// constructor(
	// 	private fb: FormBuilder,
	// 	private modalController: ModalController
	// ) { 
	// 	this.selectedDate = '';
	// }

	// ngOnInit() {
	// }
	
	// onRegister() {

	// }

	// async openCalendar() {
	// 	const modal = await this.modalController.create({
	// 	  component: RegisterPage,
	// 	  cssClass: 'calendar-modal',
	// 	  componentProps: {
	// 		selectedDate: this.selectedDate
	// 	  }
	// 	});
	
	// 	modal.onDidDismiss().then((data) => {
	// 	  if (data.data) {
	// 		this.selectedDate = data.data.selectedDate;
	// 	  }
	// 	});
	
	// 	return await modal.present();
	//   }
	
	// closeCalendar() {
	// 	this.showCalendar = false;
	// }
	// onDateChange(event: any) {
	// 	const selectedDate = new Date(event.detail.value).toLocaleDateString('en-US');
	// 	this.registerForm.get('bday')?.setValue(selectedDate);
	// }

	// onDone(event: any) {
	// 	this.onDateChange(event); // Update the input field with the selected date
	// 	this.closeCalendar();
	// }

	// onCancel() {
	// 	this.closeCalendar();
	// }
}
