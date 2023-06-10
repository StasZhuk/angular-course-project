import {
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { exhaustMap, take } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthInitialState } from '../store/reducers/auth.reducer';
import { Store } from '@ngrx/store';
import { getUserSelector } from '../store/selectors/auth.selectors';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authStore: Store<{ auth: AuthInitialState }>) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authStore.select(getUserSelector).pipe(
      take(1),
      exhaustMap((user) => {
        if (!user) {
          return next.handle(req);
        }

        const modifiedReq = req.clone({
          params: new HttpParams().set('auth', user.token),
        });

        return next.handle(modifiedReq);
      })
    );
  }
}
