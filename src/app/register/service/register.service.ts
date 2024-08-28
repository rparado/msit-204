import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Register } from '../model/user';
import { delay, mergeMap, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class RegisterService {
	private API_BASE = environment.apiUrl;
	
	constructor(
		private http: HttpClient
	) { }
	

	register(username: string, password: string): Observable<Register> {

		let data = {
			"username": username,
			"password": password
		}

		return this.http.post<any>(this.API_BASE + `register`, data)
			.pipe(
				tap((res: Register) => {
					return res;
				}),
				delay(500)
			);
	}
}
