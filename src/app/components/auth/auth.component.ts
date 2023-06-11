import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { RefDirective } from 'src/app/directives/ref.directive';
import { AlertComponent } from 'src/app/components/base/alert/alert.component';
import { getAuthState } from 'src/app/store/selectors/auth.selectors';
import {
  loginError,
  loginStart,
  signup,
} from 'src/app/store/actions/auth.actions';
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
  authSubscription: Subscription;

  @ViewChild(RefDirective) alertTemplateRef: RefDirective;

  constructor(private store: Store<AppStoreState>) {}

  ngOnInit(): void {
    this.authSubscription = this.store
      .select(getAuthState)
      .subscribe((auth) => {
        this.isFetching = auth.isLoading;
        this.error = auth.error;

        if (this.error) {
          this.createErrorAlert(this.error);
        }
      });
  }

  onToggleMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(formAuth: NgForm) {
    if (formAuth.invalid) {
      return false;
    }

    if (this.isLoginMode) {
      this.store.dispatch(loginStart({ payload: formAuth.value }));
    } else {
      this.store.dispatch(signup({ payload: formAuth.value }));
    }
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
    return this.store.dispatch(loginError({ payload: null }));
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();

    if (this.closeSubscription) {
      this.closeSubscription.unsubscribe();
    }
  }
}
