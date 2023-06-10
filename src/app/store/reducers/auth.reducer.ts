import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import { logout, setUser } from '../actions/auth.actions';

export interface AuthInitialState {
  user: User | null;
}

const authInitialState: AuthInitialState = {
  user: null,
};

export const authReducer = createReducer(
  authInitialState,
  on(setUser, (state, action) => {
    return {
      ...state,
      user: action.payload,
    };
  }),
  on(logout, (state) => {
    return {
      ...state,
      user: null,
    };
  })
);
