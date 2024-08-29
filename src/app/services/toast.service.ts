import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
	providedIn: 'root'
})
export class ToastService {

	constructor(private toastController: ToastController) {}

	async errorToast(message?: string) {
		const toast = await this.toastController.create({
			message: message,
			duration: 2000,
			position: 'bottom',
			color: 'danger',
		});

		await toast.present();
	}

	async successToast(message?: string) {
		const toast = await this.toastController.create({
			message: message,
			duration: 2000,
			position: 'bottom',
			color: 'success',
		});

		await toast.present();
	}
}
