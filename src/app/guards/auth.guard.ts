import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class AuthGuard implements CanActivate {
	constructor(private loginService: AuthService, private router: Router) {}

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		
			return this.checkLogin();

	}

	canActivateChild(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
			
			return this.canActivate(next, state);

	}

	canLoad(
		route: Route,
		segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
			// console.log('canload')
			return this.checkLogin();

	}

	async checkLogin(): Promise<boolean> {
		let token = localStorage.getItem('token');
		if (token) {
			return true;
		} else {
		this.router.navigate(['/login']); // Redirect to login page if not authenticated
			return false;
		}
	}
}