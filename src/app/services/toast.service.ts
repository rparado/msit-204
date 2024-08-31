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
			duration: 1000,
			position: 'top',
			color: 'danger',
			swipeGesture:"vertical"
		});

		await toast.present();
	}

	async successToast(message?: string) {
		const toast = await this.toastController.create({
			message: message,
			duration: 1000,
			position: 'top',
			color: 'success',
			swipeGesture:"vertical"
		});

		await toast.present();
	}
}
