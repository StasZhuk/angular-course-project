import {
  Component,
  EventEmitter,
  OnDestroy,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { RefDirective } from 'src/app/directives/ref.directive';

import { AuthResponseData, AuthService } from 'src/app/services/auth.service';
import { AlertComponent } from '../base/alert/alert.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnDestroy {
  isLoginMode: boolean = true;
  isFetching: boolean = false;
  error: string = null;
  closeSubscription: Subscription;

  @ViewChild(RefDirective) alertTemplateRef: RefDirective;

  constructor(private authService: AuthService, private router: Router) {}

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
        this.router.navigate(['/']);
      },
      error: (errorMessage) => {
        this.isFetching = false;
        this.error = errorMessage;
        this.createErrorAlert(errorMessage);
      },
    });
  }

  createErrorAlert(message: string) {
    const alertContainerRef = this.alertTemplateRef.containerRef;
    alertContainerRef.clear();

    const alertComponent = alertContainerRef.createComponent(AlertComponent);
    alertComponent.instance.title = 'Error Message';
    alertComponent.instance.message = message;

    this.closeSubscription = alertComponent.instance.close.subscribe(() => {
      this.onClose()
      this.closeSubscription.unsubscribe()
      alertComponent.destroy()
    })
  }

  onClose() {
    this.error = null;
  }

  ngOnDestroy(): void {
    if ( this.closeSubscription) {
      this.closeSubscription.unsubscribe()
    }
  }
}
