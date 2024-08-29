import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { RegisterService } from './service/register.service';
import { LoadingService } from '../shared/service/loading.service';
import { ToastService } from '../services/toast.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.page.html',
	styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

    loading: boolean = false;
	registerForm = this.fb.group({
		username: ['', [Validators.required, Validators.minLength(2)]],
		password: ['', [Validators.required, Validators.minLength(8)]]
	});

	constructor(
		private fb: FormBuilder,
		private toastController: ToastController,
		private router: Router,
		private registerService: RegisterService,
		public loadingService: LoadingService,
		private toastService: ToastService
	) { 
	}

	ngOnInit() {
	}
	
	onRegister() {
		this.loadingService.show();
		this.loading = true;
		const formData: any = this.registerForm.value;

		if(formData) {
			this.registerService.register(formData.username, formData.password)
			.subscribe(async(data: any) =>  {
				if(data) {
					this.hideLoading();
					this.toastService.successToast(data.message)
					this.router.navigateByUrl('/login');
				}
			},async (err) => {
				this.hideLoading();
				this.toastService.errorToast(err.error.message)
			})
		}
	}

	hideLoading() {
		this.loadingService.hide();
		this.loading = false;
	}

}
