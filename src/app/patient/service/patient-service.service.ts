import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
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
					console.log('res', res)
				})
			)
	}
}
