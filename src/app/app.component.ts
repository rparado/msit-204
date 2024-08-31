import { Component } from '@angular/core';
import { LocalStorageService } from './services/local-storage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  totalBillSubscription!: Subscription;
  
	isTabShown: boolean = false;
  
  constructor(	private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.totalBillSubscription = this.localStorageService.count$.subscribe(data => {
			if(data > 0) {
				this.isTabShown = true;
			} else {
        const storedValue = localStorage.getItem('billCount');
        const count = storedValue ? parseInt(storedValue, 10) : 0;
        this.localStorageService.updateCount(count)
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
