import { createSelector } from '@ngrx/store';
import { AuthInitialState } from '../reducers/auth.reducer';

export const getAuthStore = (state: { auth: AuthInitialState }) => {
  return state.auth;
};

export const getUserSelector = createSelector(
  getAuthStore,
  (auth: AuthInitialState) => {
    return auth.user;
  }
);
