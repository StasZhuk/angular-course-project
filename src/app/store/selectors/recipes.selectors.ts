import { createSelector } from '@ngrx/store';
import { AppStoreState } from '../store-root.reducer';

export const selectRecipesState = (state: AppStoreState) => {
  return state.recipes;
};

export const selectRecipes = createSelector(
  selectRecipesState,
  (recipesState) => {
    return recipesState.recipes;
  }
);

export const selectRecipe = (recipeId: number) => {
  return createSelector(selectRecipes, (recipes) => {
    return recipes.find((r) => r.id === recipeId);
  });
};

export const selectEditingRecipe = createSelector(
  selectRecipesState,
  (authState) => {
    return authState.editingRecipe;
  }
);

export const selectRecipesFetching = createSelector(
  selectRecipesState,
  (authState) => {
    return authState.isFetching;
  }
);
