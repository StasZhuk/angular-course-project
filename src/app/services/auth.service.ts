import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';

import { User, UserStorageData } from 'src/app//models/user.model';
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

interface AuthRequestData {
  email: string;
  password: string;
  returnSecureToken?: boolean;
}

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

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient, private router: Router) {}

  login(data: AuthRequestData) {
    data.returnSecureToken = true;

    return this.http
      .post<AuthResponseData>(getApiEndpoint(endpointsNames.LOGIN), data)
      .pipe(
        catchError(this.errorNormalize),
        tap((data) => this.handleUser(data))
      );
  }

  signup(data: AuthRequestData) {
    data.returnSecureToken = true;

    return this.http
      .post<AuthResponseData>(getApiEndpoint(endpointsNames.SIGNUP), data)
      .pipe(
        catchError(this.errorNormalize),
        tap((data) => this.handleUser(data))
      );
  }

  private errorNormalize({ error }: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';

    if (error && error.error) {
      errorMessage = error.error.message;
    }

    return throwError(() => errorMessage);
  }

  private handleUser(loginRes: AuthResponseData) {
    const expirationDate = new Date(
      new Date().getTime() + Number(loginRes.expiresIn) * 1000
    );
    const user = new User(
      loginRes.localId,
      loginRes.email,
      loginRes.idToken,
      expirationDate
    );
    localStorage.setItem('user', JSON.stringify(user));
    this.user.next(user);
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem('user');
    this.router.navigate(['/auth']);
  }

  getSession() {
    const userData: UserStorageData = JSON.parse(localStorage.getItem('user'));

    if (!userData) {
      return false;
    }

    const user = new User(
      userData.id,
      userData.email,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (user.token) {
      this.user.next(user);
    }
  }
}
