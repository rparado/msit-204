import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { LoadingService } from '../shared/service/loading.service';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast.service';
import { LocalStorageService } from '../services/local-storage.service';

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
		private router: Router,
		private toastService: ToastService,
		private localStorage: LocalStorageService
	) {
		
	 }

	ngOnInit() {
		this.loginForm.reset();
	}
	async onLogin() {
		this.loadingService.show();
		this.loading = true;

		if(this.loginForm.value) {
			const formData: any = this.loginForm.value;

			this.authService.login(formData.username, formData.password).subscribe(
				async (data) => {
					if (data) {
						this.hideLoading();
						this.toastService.successToast('Login Successful!')
						if(data.profileUpdated) {
							this.router.navigateByUrl('/appointment');
						} else {
							this.router.navigateByUrl('/patient/patient-profile');
						}
						
					} else {
						this.hideLoading();
						await this.toastService.errorToast('Error logging in')
					}
				},
				async () => {
					this.hideLoading();
					await this.toastService.errorToast('Error logging in')
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
	hideLoading() {
		this.loadingService.hide();
		this.loading = false;
	}
	doRefresh(event: any) {
		this.localStorage.doRefresh(event);
	}
}
