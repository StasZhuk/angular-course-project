import { createSelector } from '@ngrx/store';
import { AuthInitialState } from '../reducers/auth.reducer';

export const getAuthState = (state: { auth: AuthInitialState }) => {
  return state.auth;
};

export const getUserSelector = createSelector(
  getAuthState,
  (auth: AuthInitialState) => {
    return auth.user;
  }
);
