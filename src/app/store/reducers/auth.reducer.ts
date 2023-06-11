import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import {
  clearError,
  loginError,
  loginStart,
  loginSuccess,
  logout,
  setUser,
} from '../actions/auth.actions';

export interface AuthInitialState {
  user: User;
  isLoading: boolean;
  error: string;
}

const authInitialState: AuthInitialState = {
  user: null,
  isLoading: false,
  error: null,
};

export const authReducer = createReducer(
  authInitialState,
  on(setUser, (state, action) => {
    return {
      ...state,
      user: action.payload,
      isLoading: false,
      error: null,
    };
  }),
  on(logout, (state) => {
    return {
      ...state,
      error: null,
      user: null,
    };
  }),
  on(loginStart, (state) => {
    return {
      ...state,
      user: null,
      isLoading: true,
    };
  }),
  on(loginSuccess, (state, action) => {
    return {
      ...state,
      user: action.payload,
      isLoading: false,
      error: null,
    };
  }),
  on(loginError, (state, action) => {
    return {
      ...state,
      user: null,
      isLoading: false,
      error: action.payload,
    };
  }),
  on(clearError, (state) => {
    return {
      ...state,
      error: null,
    };
  })
);
