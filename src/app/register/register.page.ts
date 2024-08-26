import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
	selector: 'app-register',
	templateUrl: './register.page.html',
	styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

	@ViewChild('calendar', { static: false }) calendar: any;

	selectedDate: string;

	registerForm = this.fb.group({
		fname: ['', [Validators.required, Validators.minLength(1)]],
		lname: ['', [Validators.required, Validators.minLength(1)]],
		gender: ['', [Validators.required, Validators.minLength(1)]],
		bday: ['', [Validators.required, Validators.minLength(1)]],
		pnum: ['', [Validators.required, Validators.minLength(1)]],
		addr: ['', [Validators.required, Validators.minLength(1)]],
		username: ['', [Validators.required, Validators.minLength(1)]],
		password: ['', [Validators.required, Validators.minLength(1)]]
	});

	showCalendar: boolean = false;

	

	constructor(
		private fb: FormBuilder,
	) { 
		this.selectedDate = '';
	}

	ngOnInit() {
	}
	
	onRegister() {

	}

	openCalendar() {
		this.showCalendar = true;
	}
	closeCalendar() {
		this.showCalendar = false;
	}
	onDateChange(event: any) {
		const selectedDate = new Date(event.detail.value).toLocaleDateString('en-US');
		this.registerForm.get('bday')?.setValue(selectedDate);
	}

	onDone(event: any) {
		this.onDateChange(event); // Update the input field with the selected date
		this.closeCalendar();
	}

	onCancel() {
		this.closeCalendar();
	}

}
