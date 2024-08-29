import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, tap } from 'rxjs';
import { PatientProfile } from 'src/app/register/model/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientServiceService {
	private API_BASE = environment.apiUrl;

  	constructor(private http: HttpClient) { }

	updateProfile(data: PatientProfile) : Observable<PatientProfile> {
		return this.http.post(this.API_BASE + `patients`, data)
			.pipe(
				tap((res: any) => {
					return res;
				}),
				delay(500)
			)
	}
	getProfile(): Observable<string> {
		return this.http.get(this.API_BASE + `patients/profile`)
			.pipe(
				tap((res: any) => {
					return res;
				}),
				delay(500)
			)
	}
}
