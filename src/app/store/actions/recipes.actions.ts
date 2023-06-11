import { createAction, props } from '@ngrx/store';
import { Recipe } from 'src/app/models/recipe.model';

const SET_RECIPES = '[Recipes] SetRecipes';
const ADD_RECIPE = '[Recipes] AddRecipe';
const REMOVE_RECIPE = '[Recipes] RemoveRecipe';
const UPDATE_RECIPE = '[Recipes] UpdateRecipe';
const START_EDITING_RECIPE = '[Recipes] StartEditingRecipe';
const STOP_EDITING_RECIPE = '[Recipes] StopEditingRecipe';
const FETCH_RECIPES = '[Recipes] FetchRecipes';
const SAVE_RECIPES = '[Recipes] SaveRecipes';
const SET_FETCHING_RECIPES = '[Recipes] SetFetchingRecipes';

export const setRecipes = createAction(
  SET_RECIPES,
  props<{ payload: Recipe[] }>()
);

export const addRecipe = createAction(ADD_RECIPE, props<{ payload: Recipe }>());

export const updateRecipe = createAction(
  UPDATE_RECIPE,
  props<{ payload: Recipe }>()
);

export const removeRecipe = createAction(
  REMOVE_RECIPE,
  props<{ payload: number }>()
);

export const startEditingRecipe = createAction(
  START_EDITING_RECIPE,
  props<{ payload: Recipe }>()
);

export const stopEditingRecipe = createAction(STOP_EDITING_RECIPE);

export const fetchRecipes = createAction(FETCH_RECIPES);

export const saveRecipes = createAction(SAVE_RECIPES);

export const setFetchingRecipes = createAction(
  SET_FETCHING_RECIPES,
  props<{ payload: boolean }>()
);
