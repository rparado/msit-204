import { Component } from '@angular/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { LoadingService } from '../service/loading.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-page-loading',
  standalone: true,
  imports: [MatProgressBarModule, CommonModule],
  templateUrl: './page-loading.component.html',
  styleUrl: './page-loading.component.scss'
})
export class PageLoadingComponent {
    loading: boolean = false;
    loadingSubscription!: Subscription;
    
    constructor(public loadingService: LoadingService) {

    }
    ngOnInit(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        this.loadingSubscription = this.loadingService.loading$.subscribe( state => {
            this.loading = state;
        });
    }
    ngOnDestroy(): void {
        //Called once, before the instance is destroyed.
        //Add 'implements OnDestroy' to the class.
        this.loadingSubscription.unsubscribe();
    }
}
