import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../shared/service/loading.service';
import { BillService } from './service/bill.service';
import { Bill } from './model/bill';
import { PatientServiceService } from '../patient/service/patient-service.service';
import { combineLatest, map } from 'rxjs';
import { ToastService } from '../services/toast.service';

@Component({
	selector: 'app-bills',
	templateUrl: './bills.page.html',
	styleUrls: ['./bills.page.scss'],
})
export class BillsPage implements OnInit {
	bills: Bill[] = [];

	loading: boolean = false;

	user: any;

	constructor(
		public loadingService: LoadingService,
		private billService: BillService,
		private profileService: PatientServiceService,
		private toastService: ToastService,
	) { }

	ngOnInit() {
		this.getCombinedAPIData();
	}

	getCombinedAPIData() {
		this.loadingService.show();
		this.loading = true;

		const billId: any = localStorage.getItem("billid")

		const userProfile$ = this.profileService.getProfile();
		const bills$ = this.billService.getBills(billId)

		combineLatest([userProfile$, bills$]).pipe(
			map(([userProfile, bills]) => {
				return {
					userProfile, bills
				}
			})
		).subscribe(
			{
				next: (combinedResponse: any) => {

					this.loadingService.hide();
					this.loading = false;

					this.user = combinedResponse.userProfile;
					this.bills = combinedResponse.bills;
				},
				error: (error) => {
					this.toastService.errorToast(error.error.message);
				}
			}
		)
	}

}
