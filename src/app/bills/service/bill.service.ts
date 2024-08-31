import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Bill } from '../model/bill';

@Injectable({
  providedIn: 'root'
})
export class BillService {
  private API_BASE = environment.apiUrl;
  constructor(
    private http: HttpClient
  ) { }

  getBills(billingId: string): Observable<Bill> {
		return this.http.get(this.API_BASE + `billing/` + billingId)
			.pipe(
				tap((res: any) => {
					return res;
				}),
				catchError(error => {
					console.error('Error fetching bills:', error);
					return throwError(error);
				})
			)
	}
}
