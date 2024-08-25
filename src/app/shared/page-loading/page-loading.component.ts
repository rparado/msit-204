import { Component } from '@angular/core';
import { LoadingService } from '../service/loading.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { IonProgressBar } from "@ionic/angular/standalone";

@Component({
  selector: 'app-page-loading',
  standalone: true,
  imports: [IonProgressBar, CommonModule],
  templateUrl: './page-loading.component.html',
  styleUrl: './page-loading.component.scss'
})
export class PageLoadingComponent {
    loading: boolean = false;

    constructor(public loadingService: LoadingService) {

    }
    ngOnInit(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        this.loadingService.loading$.subscribe(isLoading => {
            this.loading = isLoading;
        });
    }
}
