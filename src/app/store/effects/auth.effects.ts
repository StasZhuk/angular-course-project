import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, of, switchMap, take, tap, throwError } from 'rxjs';
import { User, UserStorageData } from 'src/app/models/user.model';
import {
  getSession,
  login,
  logout,
  setUser,
  signup,
} from '../actions/auth.actions';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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

const errorNormalize = ({ error }: HttpErrorResponse) => {
  let errorMessage = 'Unknown error!';

  if (error && error.error) {
    errorMessage = error.error.message;
  }

  return throwError(() => errorMessage);
};

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  displayName: string;
  kind: string;
  registered?: boolean;
}

@Injectable()
export class AuthEffects {
  getSession = createEffect(() => {
    return this.actions$.pipe(
      ofType(getSession),
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
    );
  });

  clearSession = createEffect(() => {
    return this.actions$.pipe(
      ofType(logout),
      take(1),
      tap(() => {
        localStorage.removeItem('user');
        this.router.navigate(['/auth']);
      })
    );
  });

  authUser = createEffect(() => {
    return this.actions$.pipe(
      ofType(login, signup),
      take(1),
      switchMap((action) => {
        return this.http
          .post<AuthResponseData>(getApiEndpoint(endpointsNames.LOGIN), {
            ...action.payload,
            returnSecureToken: true,
          })
          .pipe(
            catchError(errorNormalize),
            switchMap((authDataResponse) => {
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
              return of(setUser({ payload: user }));
            })
          );
      })
    );
  });

  constructor(
    private actions$: Actions,
    private router: Router,
    private http: HttpClient
  ) {}
}
