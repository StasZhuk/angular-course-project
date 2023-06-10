import { createSelector } from '@ngrx/store';
import { ShoppingListInitialState } from '../reducers/shopping-list.reducer';

export const selectShoppingListState = (state: {
  shoppingList: ShoppingListInitialState;
}) => {
  return state.shoppingList;
};

export const selectIngredients = createSelector(
  selectShoppingListState,
  (state: ShoppingListInitialState) => {
    return state.ingredients;
  }
);

export const selectIngredient = (ingredientId: number) =>
  createSelector(selectIngredients, (ingredients) =>
    ingredients.find((i) => i.id === ingredientId)
  );

export const selectEditingIngredient = createSelector(
  selectShoppingListState,
  (state) => state.editIngredient
);
