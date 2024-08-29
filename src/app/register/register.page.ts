import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { RegisterService } from './service/register.service';
import { Register } from './model/user';
import { LoadingService } from '../shared/service/loading.service';

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
					await this.showSuccessToast(data.message);
					this.router.navigateByUrl('/login');
				}
			},async (err) => {
				this.hideLoading();
				await this.showErrorToast(err.error.message);
			})
		}
	}

	async showErrorToast(message: string) {
		this.loadingService.hide();
		this.loading = false;
		const toast = await this.toastController.create({
			message: message,
			duration: 2000,
			position: 'bottom',
			color: 'danger',
		});

		await toast.present();
	}

	async showSuccessToast(message: string) {
		const toast = await this.toastController.create({
			message: message,
			duration: 2000,
			position: 'bottom',
			color: 'success',
		});

		await toast.present();
	}

	hideLoading() {
		this.loadingService.hide();
		this.loading = false;
	}

}
