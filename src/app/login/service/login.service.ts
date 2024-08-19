import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private mockUser = {
    username: "patient_test",
    password: "password1234!"
}

  constructor(
  ) { }

  login(username: string, password: string): Observable<boolean> {
    if(username === this.mockUser.username && password === this.mockUser.password) {
        return of(true);
    } else {
        return of(false)
    }
    
  }
}
