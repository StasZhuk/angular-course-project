import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { RefDirective } from 'src/app/directives/ref.directive';
import { AuthResponseData } from 'src/app/services/auth.service';
import { AlertComponent } from 'src/app/components/base/alert/alert.component';
import { getUserSelector } from 'src/app/store/selectors/auth.selectors';
import { login, signup } from 'src/app/store/actions/auth.actions';
import { AppStoreState } from 'src/app/store/store-root.reducer';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnDestroy, OnInit {
  isLoginMode: boolean = true;
  isFetching: boolean = false;
  error: string = null;
  closeSubscription: Subscription;

  @ViewChild(RefDirective) alertTemplateRef: RefDirective;

  constructor(private store: Store<AppStoreState>, private router: Router) {
    this.store.select(getUserSelector).subscribe((user) => {
      if (user) {
        this.router.navigate(['recipe-book']);
      }
    });
  }

  ngOnInit(): void {}

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
      // authObserver = this.authService.login(formAuth.value);
      this.store.dispatch(login({ payload: formAuth.value }));
    } else {
      this.store.dispatch(signup({ payload: formAuth.value }));
      // authObserver = this.authService.signup(formAuth.value);
    }

    // authObserver.subscribe({
    //   next: () => {
    //     this.isFetching = false;
    //     formAuth.reset();
    //     this.router.navigate(['/']);
    //   },
    //   error: (errorMessage) => {
    //     this.isFetching = false;
    //     this.error = errorMessage;
    //     this.createErrorAlert(errorMessage);
    //   },
    // });
  }

  createErrorAlert(message: string) {
    const alertContainerRef = this.alertTemplateRef.containerRef;
    alertContainerRef.clear();

    const alertComponent = alertContainerRef.createComponent(AlertComponent);
    alertComponent.instance.title = 'Error Message';
    alertComponent.instance.message = message;

    this.closeSubscription = alertComponent.instance.close.subscribe(() => {
      this.onClose();
      this.closeSubscription.unsubscribe();
      alertComponent.destroy();
    });
  }

  onClose() {
    this.error = null;
  }

  ngOnDestroy(): void {
    if (this.closeSubscription) {
      this.closeSubscription.unsubscribe();
    }
  }
}
