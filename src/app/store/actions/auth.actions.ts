import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/user.model';

const SET_USER = '[Auth] setUser';
const LOGIN = '[Auth] login';
const SIGNUP = '[Auth] signup';
const LOGOUT = '[Auth] logout';
const GET_SESSION = '[Auth] getSession';

export const setUser = createAction(
  SET_USER,
  props<{ payload: User | null }>()
);

interface AuthRequestData {
  email: string;
  password: string;
  returnSecureToken?: boolean;
}

export const getSession = createAction(GET_SESSION);

export const login = createAction(LOGIN, props<{ payload: AuthRequestData }>());

export const signup = createAction(SIGNUP, props<{ payload: AuthRequestData }>());

export const logout = createAction(LOGOUT);
