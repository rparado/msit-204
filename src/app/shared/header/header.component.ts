import { Component, Input, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {
	@Input() pageTitle: string = '';

	constructor(
		private authService: AuthService,
		private actionSheetCtrl: ActionSheetController
	) { }

	ngOnInit() {}

	logout() {
		window.location.href='/login'
	}
	profile() {

	}
	async presentActionSheet() {
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
