import { ActionReducerMap } from '@ngrx/store';
import { AuthInitialState, authReducer } from './reducers/auth.reducer';
import {
  ShoppingListInitialState,
  shoppingListReducer,
} from './reducers/shopping-list.reducer';
import {
  RecipesInitialState,
  recipesReducer,
} from './reducers/recipes.reducer';

export interface AppStoreState {
  shoppingList: ShoppingListInitialState;
  auth: AuthInitialState;
  recipes: RecipesInitialState;
}

export const rootReducer: ActionReducerMap<AppStoreState> = {
  shoppingList: shoppingListReducer,
  auth: authReducer,
  recipes: recipesReducer,
};
