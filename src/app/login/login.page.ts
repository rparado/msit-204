import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { LoadingService } from '../shared/service/loading.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
	
	loginFailed: boolean = false;
    loading: boolean = false;
	
	loginForm = this.fb.group({
		username: ['', [Validators.required, Validators.minLength(1)]],
		password: ['', [Validators.required, Validators.minLength(1)]]
	})
	constructor(
		private fb: FormBuilder,
		private authService: AuthService,
		public loadingService: LoadingService,
		private toastController: ToastController,
		private router: Router
	) {
		
	 }

	ngOnInit() {

	}
	async onLogin() {
		this.loadingService.show();
		this.loading = true;

		if(this.loginForm.value) {
			const formData: any = this.loginForm.value;

			this.authService.login(formData.username, formData.password).subscribe(
				async (data) => {
					if (data) {
						this.loadingService.hide();
						this.loading = false;
						await this.showSuccessToast();
						this.router.navigateByUrl('/patient');
					} else {
						this.loadingFailed();
					}
				},
				async () => {
					this.loadingFailed();
				}
			);
		} else {
			this.loadingService.hide();
			this.loading = false;
		}

       
    }

	onRegister() {
		this.router.navigateByUrl('/register')
	}

	async loadingFailed() {
		this.loading = false;
		this.loadingService.hide();

		const toast = await this.toastController.create({
			message: 'Incorrect Username and Password!',
			duration: 3000,
			position: 'bottom',
			color: 'danger',
		});

		await toast.present();
	}

	async showSuccessToast() {
		const toast = await this.toastController.create({
			message: 'Login successful!',
			duration: 3000,
			position: 'bottom',
			color: 'success',
		});

		await toast.present();
	}

}
