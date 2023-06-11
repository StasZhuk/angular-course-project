import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, take, tap } from 'rxjs';
import { User, UserStorageData } from 'src/app/models/user.model';
import {
  AuthResponseData,
  getSession,
  loginSuccess,
  loginError,
  logout,
  signup,
  loginStart,
  setUser,
} from '../actions/auth.actions';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const API_KEY = environment.firebaseApiKey;
const AUTH_ENDPOINT = 'https://identitytoolkit.googleapis.com/v1/accounts';

const endpointsNames = {
  SIGNUP: 'signUp',
  LOGIN: 'signInWithPassword',
};

const getApiEndpoint = (endpointName) => {
  return `${AUTH_ENDPOINT}:${endpointName}?key=${API_KEY}`;
};

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private http: HttpClient
  ) {}

  getSession = createEffect(() =>
    this.actions$.pipe(
      ofType(getSession),
      take(1),
      switchMap(() => {
        const userData: UserStorageData = JSON.parse(
          localStorage.getItem('user')
        );

        if (userData) {
          const user = new User(
            userData.id,
            userData.email,
            userData._token,
            new Date(userData._tokenExpirationDate)
          );

          if (user.token) {
            return of(setUser({ payload: user }));
          }
        }

        return of(setUser({ payload: null }));
      })
    )
  );

  clearSession = createEffect(() =>
    this.actions$.pipe(
      ofType(logout),
      take(1),
      tap(() => {
        localStorage.removeItem('user');
        this.router.navigate(['/auth']);
      })
    )
  );

  authUser = createEffect(() =>
    this.actions$.pipe(
      ofType(loginStart, signup),
      switchMap((action) => {
        return this.http
          .post<AuthResponseData>(getApiEndpoint(endpointsNames.LOGIN), {
            ...action.payload,
            returnSecureToken: true,
          })
          .pipe(
            map((authDataResponse: AuthResponseData) => {
              const expirationDate = new Date(
                new Date().getTime() + Number(authDataResponse.expiresIn) * 1000
              );
              const user = new User(
                authDataResponse.localId,
                authDataResponse.email,
                authDataResponse.idToken,
                expirationDate
              );
              localStorage.setItem('user', JSON.stringify(user));
              return loginSuccess({ payload: user });
            }),
            catchError(({ error }) => {
              let errorMessage = 'Unknown error!';

              if (error && error.error) {
                errorMessage = error.error.message;
              }

              return of(loginError({ payload: errorMessage }));
            })
          );
      })
    )
  );

  authSuccess = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loginSuccess),
        tap(() => {
          this.router.navigate(['/']);
        })
      );
    },
    { dispatch: false }
  );
}
