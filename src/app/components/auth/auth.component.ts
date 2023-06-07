import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  isLoginMode: boolean = true;
  isFetching: boolean = false;
  error: string;

  constructor(private authService: AuthService) {}

  onToggleMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(formAuth: NgForm) {
    if (formAuth.invalid) {
      return false;
    }

    this.isFetching = true;
    this.error = undefined;

    const onError = ({ error }) => {
      this.isFetching = false;
      this.error = error.error.message;
    };

    const onComplete = (res) => {
      console.log(res);
      this.isFetching = false;
      formAuth.reset();
    };

    if (this.isLoginMode) {
      this.authService.login(formAuth.value).subscribe({
        next: onComplete,
        error: onError,
      });
    } else {
      this.authService.signup(formAuth.value).subscribe({
        next: onComplete,
        error: onError,
      });
    }
  }
}
