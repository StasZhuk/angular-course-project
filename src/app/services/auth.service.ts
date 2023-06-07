import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

const API_KEY = 'AIzaSyANZrf2GJDHyCVhHaevcjaTaOwOOr6uPd0';
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

interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered: boolean;
  displayName: string;
  kind: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(data: AuthRequestData) {
    data.returnSecureToken = true;

    return this.http
      .post<AuthResponseData>(getApiEndpoint(endpointsNames.LOGIN), data)
      .pipe(
        tap((loginRes) => {
          console.log({ loginRes });
        })
        // catchError((err, caught) => {
        //   console.log({ err });
        //   return caught;
        // })
      );
  }

  signup(data: AuthRequestData) {
    data.returnSecureToken = true;

    return this.http
      .post<AuthResponseData>(getApiEndpoint(endpointsNames.SIGNUP), data)
      .pipe(
        tap((signupRes) => {
          console.log({ signupRes });
        })
        // catchError((err, caught) => {
        //   console.log({ err });
        //   return caught;
        // })
      );
  }
}
