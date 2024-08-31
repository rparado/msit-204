import { Component} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DateService } from '../services/date.service';

@Component({
	selector: 'app-calendar',
	templateUrl: './calendar.page.html',
	styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage {
	maxDate: string;
	

	constructor(
		private modalCtrl: ModalController,
		private dateService: DateService
	) {
		const today = new Date();
		this.maxDate = today.toISOString().split('T')[0];
	}

	async onDateSelected(event: any) {
		const selectedDate = new Date(event.detail.value).toLocaleDateString('en-US');
		this.dateService.selectDate(selectedDate);
		await this.modalCtrl.dismiss();
	  }
	
	  async closeModal() {
		await this.modalCtrl.dismiss();
	  }

}
