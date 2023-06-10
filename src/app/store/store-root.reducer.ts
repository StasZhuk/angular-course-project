import { ActionReducerMap } from '@ngrx/store';
import { AuthInitialState, authReducer } from './reducers/auth.reducer';
import {
  ShoppingListInitialState,
  shoppingListReducer,
} from './reducers/shopping-list.reducer';

export interface AppStoreState {
  shoppingList: ShoppingListInitialState;
  auth: AuthInitialState;
}

export const rootReducer: ActionReducerMap<AppStoreState> = {
  shoppingList: shoppingListReducer,
  auth: authReducer,
};
