import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, mergeMap, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private isLoggedIn = false;
	private API_BASE = environment.apiUrl;

	constructor(
		private http: HttpClient
	) { }
  
	login(username: string, password: string): Observable<any> {

		let data = {
			"username": username,
			"password": password
		}


		return this.http.post<any>(this.API_BASE + `login`, data)
			.pipe(
				tap(res => {
					if(res) {
						localStorage.setItem('token', res.token);
					} else {
						this.clearLocalStorage();
					}
				}),
			);
	  
	}
	logout() {
	  this.isLoggedIn = false;
	}
	isAuthenticated(): boolean {
	  return this.isLoggedIn
	}

	clearLocalStorage() {
		localStorage.removeItem('token');
	}
}
