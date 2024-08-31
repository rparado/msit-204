import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DateService } from 'src/app/services/date.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage  {

    currentDate: string;
	constructor(
		private modalCtrl: ModalController,
		private dateService: DateService
	) {
        this.currentDate = new Date().toISOString();
	}

	async onDateSelected(event: any) {
        const selectedDate = new Date(event.detail.value);

        const formattedDateTime = selectedDate.toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });

        console.log('selectedDate ', formattedDateTime)
		this.dateService.selectDate(formattedDateTime);
		await this.modalCtrl.dismiss();
	}
	
    async closeModal() {
        await this.modalCtrl.dismiss();
    }

}
