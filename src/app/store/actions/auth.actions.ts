import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/user.model';

const SET_USER = '[Auth] SetUser';
const LOGIN_START = '[Auth] LoginStart';
const LOGIN_SUCCESS = '[Auth] LoginSuccess';
const LOGIN_ERROR = '[Auth] LoginError';
const SIGNUP = '[Auth] Signup';
const LOGOUT = '[Auth] Logout';
const GET_SESSION = '[Auth] GetSession';

export interface AuthRequestData {
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

export const setUser = createAction(
  SET_USER,
  props<{ payload: User | null }>()
);

export const getSession = createAction(GET_SESSION);

export const loginStart = createAction(
  LOGIN_START,
  props<{ payload: AuthRequestData }>()
);

export const loginSuccess = createAction(
  LOGIN_SUCCESS,
  props<{ payload: User }>()
);

export const loginError = createAction(
  LOGIN_ERROR,
  props<{ payload: string }>()
);

export const signup = createAction(
  SIGNUP,
  props<{ payload: AuthRequestData }>()
);

export const logout = createAction(LOGOUT);
