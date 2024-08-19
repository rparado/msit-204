import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { LoginService } from './service/login.service';
import { LoadingService } from '../shared/service/loading.service';
import { PageLoadingComponent } from '../shared/page-loading/page-loading.component';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    ReactiveFormsModule,
    MatButtonModule,
    PageLoadingComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
    loginForm: any;
    loginFailed: boolean = false;
    loading: boolean = false;

    constructor(
        private fb: FormBuilder,
        private loginService: LoginService,
        private loadingService: LoadingService
    ) {
        this.loginForm = this.fb.group({
            username: ['', [Validators.required, Validators.minLength(1)]],
            password: ['', [Validators.required, Validators.minLength(1)]]
        })
    }

    onLogin() {
        this.loadingService.show();
        this.loading = true;

        this.loginService.login( this.loginForm.value.username,  this.loginForm.value.password)
        .subscribe(data => {
            if(data) {
                this.loadingService.hide();
                this.loading = false;
                window.location.href = '/patients';
            } else {
                this.loginFailed = true;
                this.loadingService.hide();
                this.loading = false;
            }
        })
    }


}
