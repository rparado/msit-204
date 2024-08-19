import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { LoginService } from './service/login.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
    loginForm: any;
    loginFailed: boolean = false;

    constructor(
        private fb: FormBuilder,
        private loginService: LoginService
    ) {
        this.loginForm = this.fb.group({
            username: ['', [Validators.required, Validators.minLength(1)]],
            password: ['', [Validators.required, Validators.minLength(1)]]
        })
    }

    onLogin() {
        console.log(this.loginForm)
        this.loginService.login( this.loginForm.value.username,  this.loginForm.value.password)
        .subscribe(data => {
            if(data) {
            } else {
                this.loginFailed = true;
            }
        })
    }


}
