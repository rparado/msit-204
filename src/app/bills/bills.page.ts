import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoadingService } from '../shared/service/loading.service';
import { BillService } from './service/bill.service';
import { Bill } from './model/bill';
import { PatientServiceService } from '../patient/service/patient-service.service';
import { forkJoin, map, Subscription } from 'rxjs';
import { ToastService } from '../services/toast.service';
import { AppointmentService } from '../appointment/service/appointment.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
	selector: 'app-bills',
	templateUrl: './bills.page.html',
	styleUrls: ['./bills.page.scss'],
})
export class BillsPage implements OnInit {
	bills: any;

	loading: boolean = false;

	user: any;

	totalBill: number = 0;

	totalBillSubscription!: Subscription;
  
	isTabShown: boolean = false;

	constructor(
		public loadingService: LoadingService,
		private billService: BillService,
		private profileService: PatientServiceService,
		private toastService: ToastService,
		private appointmentService: AppointmentService,
		private cdr: ChangeDetectorRef,
		private router: Router,
		private localStorageService: LocalStorageService,
	) { }

	ngOnInit() {
		
		this.getCombinedAPIData();
		this.cdr.detectChanges();

		this.totalBillSubscription = this.localStorageService.count$.subscribe(data => {
			if(data > 0) {
				this.isTabShown = true;
			}
		})

	}
	ionViewWillEnter() {
		this.getCombinedAPIData();
	}

	getCombinedAPIData() {
		this.loadingService.show();
		this.loading = true;
		this.toastService.successToast('Loading data. Please wait...');

		const billId: any = localStorage.getItem("billid")

		const userProfile$ = this.profileService.getProfile();
		const bills$ = this.billService.getBills(billId)

		forkJoin ([userProfile$, bills$]).pipe(
			map(([userProfile, bills]) => {
				return {
					userProfile, bills
				}
			})
		).subscribe(
			{
				next: (combinedResponse: any) => {
					if(combinedResponse) {
						this.toastService.successToast('Data successfully loaded.');
						this.hideLoading();
						this.user = combinedResponse.userProfile;
						this.bills = combinedResponse.bills;
						localStorage.setItem('billCount', this.bills.length)
						this.localStorageService.updateCount(this.bills.length)
					}

				},
				error: (error) => {
					this.toastService.errorToast(error.error.message);
					setTimeout(() => {
						this.router.navigateByUrl('/appointment/list');
					}, 2000)
				}
			}
		)
	}
	pay() {
		const billId: any = localStorage.getItem('billid');
		this.appointmentService.payAppointment(billId)
			.subscribe((data: any) => {
				if(data) {
					this.toastService.successToast(data.message)
					setTimeout(() => {
						this.router.navigateByUrl('/appointment');
					}, 2000)
				} 
				
			},(err) => {
				this.toastService.successToast(err.error.message);
				setTimeout(() => {
					this.router.navigateByUrl('/appointment');
				}, 2000)
			})
	}

	isPaidFn(billingId: string): boolean {
		const billing = this.bills.find((b:any) => b.BillingID === billingId);
		return billing ? billing.isPaid : false;
	}
	hideLoading() {
		this.loadingService.hide();
		this.loading = false;
	}

	ngOnDestroy(): void {
		//Called once, before the instance is destroyed.
		//Add 'implements OnDestroy' to the class.
		if (this.totalBillSubscription) {
		  this.totalBillSubscription.unsubscribe();
		}
	  }
	doRefresh(event: any) {
		this.localStorageService.doRefresh(event);
	}
}
