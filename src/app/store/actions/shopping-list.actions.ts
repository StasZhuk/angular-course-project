import { Ingredient } from 'src/app/models/ingredient.model';
import { createAction, props } from '@ngrx/store';

export const ADD_INGREDIENT_TYPE = '[ShoppingList] AddIngredient';
export const ADD_INGREDIENTS_TYPE = '[ShoppingList] AddIngredients';
export const UPDATE_INGREDIENTS_TYPE = '[ShoppingList] UpdateIngredient';
export const REMOVE_INGREDIENTS_TYPE = '[ShoppingList] RemoveIngredient';
export const START_EDITING_INGREDIENT = '[ShoppingList] StartEditingIngredient';
export const STOP_EDITING_INGREDIENT = '[ShoppingList] StopEditingIngredient';

// new version
export const addIngredient = createAction(
  ADD_INGREDIENT_TYPE,
  props<{ payload: Ingredient }>()
);

export const addIngredients = createAction(
  ADD_INGREDIENTS_TYPE,
  props<{ payload: Ingredient[] }>()
);

export const updateIngredient = createAction(
  UPDATE_INGREDIENTS_TYPE,
  props<{ payload: Ingredient }>()
);

export const removeIngredient = createAction(
  REMOVE_INGREDIENTS_TYPE,
  props<{ payload: number }>()
);

export const startEditingIngredient = createAction(
  START_EDITING_INGREDIENT,
  props<{ payload: number }>()
);

export const stopEditingIngredient = createAction(STOP_EDITING_INGREDIENT);

// // old version
// export class AddIngredientAction implements Action {
//   readonly type = ADD_INGREDIENTS_TYPE;
//   constructor(public payload: Ingredient) {}
// }

// export class UpdateIngredientAction implements Action {
//   readonly type = UPDATE_INGREDIENTS_TYPE;
//   constructor(public payload: Ingredient) {}
// }

// export class RemoveIngredientAction implements Action {
//   readonly type = REMOVE_INGREDIENTS_TYPE;
//   constructor(public payload: number) {}
// }

// export type ShoppingListActions = AddIngredientAction | UpdateIngredientAction | RemoveIngredientAction
