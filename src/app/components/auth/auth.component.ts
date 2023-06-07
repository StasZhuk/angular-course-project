import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

import { AuthResponseData, AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  isLoginMode: boolean = true;
  isFetching: boolean = false;
  error: string = null;

  constructor(private authService: AuthService) {}

  onToggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.error = null;
  }

  onSubmit(formAuth: NgForm) {
    if (formAuth.invalid) {
      return false;
    }

    let authObserver: Observable<AuthResponseData>;
    this.error = null;
    this.isFetching = true;

    if (this.isLoginMode) {
      authObserver = this.authService.login(formAuth.value);
    } else {
      authObserver = this.authService.signup(formAuth.value);
    }

    authObserver.subscribe({
      next: () => {
        this.isFetching = false;
        formAuth.reset();
      },
      error: (errorMessage) => {
        this.isFetching = false;
        this.error = errorMessage;
      },
    });
  }
}
