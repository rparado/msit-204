import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {
	@Input() pageTitle: string = '';

	constructor(
		private actionSheetCtrl: ActionSheetController,
		private route: Router
	) { }

	ngOnInit() {}

	logout() {
		this.route.navigateByUrl('/login')
	}
	profile() {
		this.route.navigateByUrl('/patient/patient-profile');
	}
	async userSettingActionSheet() {
		const actionSheet = await this.actionSheetCtrl.create({
		  header: 'Settings',
		  buttons: [
			{
			  text: 'Profile',
			  handler: () => {
				this.profile();
			  },
			},
			{
			  text: 'Logout',
			  handler: () => {
				this.logout();
			  },
			},
			{
			  text: 'Cancel',
			  role: 'cancel',
			  data: {
				action: 'cancel',
			  },
			},
		  ],
		});
	
		await actionSheet.present();
	}
	
}
