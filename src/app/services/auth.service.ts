import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, mergeMap, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Register } from '../register/model/user';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private isLoggedIn = false;
	private API_BASE = environment.apiUrl;

	constructor(
		private http: HttpClient
	) { }
  
	login(username: string, password: string): Observable<Register> {

		let data = {
			"username": username,
			"password": password
		}


		return this.http.post<any>(this.API_BASE + `login`, data)
			.pipe(
				tap((res: any) => {
					if(res) {
						localStorage.setItem('token', res.token);
						localStorage.setItem('userId', res.id);
						localStorage.setItem('profileUpdated', res.profileUpdated)
					} else {
						this.clearLocalStorage();
					}
				}),
			);
	  
	}
	logout() {
	  this.isLoggedIn = false;
	  this.clearLocalStorage();
	}
	isAuthenticated(): boolean {
	  return this.isLoggedIn
	}

	clearLocalStorage() {
		localStorage.removeItem('token');
		localStorage.removeItem('userId');
		localStorage.removeItem('billid');
		localStorage.removeItem('profileUpdated');
		localStorage.removeItem('billCount');
	}
}
