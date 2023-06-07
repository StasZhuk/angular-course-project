import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  isLoginMode: boolean = true;

  onToggleMode() {
    this.isLoginMode = !this.isLoginMode
  }

  onSubmit(formAuth:NgForm) {
    console.log(formAuth.value)
    formAuth.reset()
  }
}
