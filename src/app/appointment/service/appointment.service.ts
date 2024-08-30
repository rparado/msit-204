import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AppointmentData, Specialization } from '../model/specialization';

@Injectable({
	providedIn: 'root'
})
export class AppointmentService {
	private API_BASE = environment.apiUrl;
	
	constructor(private http: HttpClient) { }

	getSpecializations(): Observable<Specialization> {
		return this.http.get(this.API_BASE + `specialization`)
			.pipe(
				tap((res: any) => {
					return res;
				}),
			)
	}
	getDoctors(specializationId: string): Observable<string> {
		return this.http.get(this.API_BASE + `doctors/` + specializationId)
			.pipe(
				tap((res: any) => {
					return res;
				}),
			)
	}
	processAppointment(postData: AppointmentData): Observable<AppointmentData> {
		return this.http.post(this.API_BASE + `appointments/set`, postData)
			.pipe(
				tap((res: any) => {
					return res;
				}),
			)
	}
	getAppointments():  Observable<string> {
		return this.http.get(this.API_BASE + `appointments/all`)
			.pipe(
				tap((res: any) => {
					return res;
				}),
			)
	}
}
