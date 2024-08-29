import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, from } from 'rxjs';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {

  private API_BASE = environment.apiUrl;

  constructor(
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // convert promise to observable using 'from' operator
    return from(this.addPasswordHeader(request, next)) as Observable<HttpEvent<any>>;
  }

  async addPasswordHeader(request: HttpRequest<any>, next: HttpHandler) {

    //list of API calls we don't want to add the Bearer token
    let apiEndpoints = [
      `${this.API_BASE}/login`,
      `${this.API_BASE}/register`,
    ];

    if( !apiEndpoints.includes(request.url) ) {
      //this API endpoint needs a Bearer token

      let token = localStorage.getItem(`token`);


      request = request.clone({
        setHeaders: {
          'Authorization': `Bearer ${token}`
        }
      });

    }

    return next.handle(request).toPromise();

  }

}
