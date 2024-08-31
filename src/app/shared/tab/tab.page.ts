import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.page.html',
  styleUrls: ['./tab.page.scss'],
})
export class TabPage implements OnInit {
  tabActive: boolean = false;

  totalBill: number = 0;

  totalBillSubscription!: Subscription;

  isTabShown: boolean = false;
  
  constructor(
    private cdr: ChangeDetectorRef,
    private localStorageService: LocalStorageService,
  ) { }

  ngOnInit() {
    this.cdr.detectChanges();
    const profileUpdated =  localStorage.getItem('profileUpdated');

    if(profileUpdated === null || profileUpdated === 'false') {
        this.tabActive = false;
    } else {
      this.tabActive = true;
    }
    console.log('  this.tabActive = true; ',  this.tabActive)

    this.totalBillSubscription = this.localStorageService.count$.subscribe(data => {
			if(data > 0) {
				this.isTabShown = true;
			}
		})

   
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if (this.totalBillSubscription) {
      this.totalBillSubscription.unsubscribe();
    }
  }

}
