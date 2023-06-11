import { Recipe } from 'src/app/models/recipe.model';
import { createReducer, on } from '@ngrx/store';
import {
  addRecipe,
  updateRecipe,
  removeRecipe,
  setRecipes,
  startEditingRecipe,
  stopEditingRecipe,
  setFetchingRecipes,
} from '../actions/recipes.actions';

export interface RecipesInitialState {
  recipes: Recipe[];
  editingRecipe: Recipe;
  isFetching: boolean;
}

const initialState: RecipesInitialState = {
  recipes: [],
  editingRecipe: null,
  isFetching: false,
};

export const recipesReducer = createReducer(
  initialState,
  on(setRecipes, (state, action) => {
    return {
      ...state,
      recipes: [...action.payload],
    };
  }),
  on(addRecipe, (state, action) => {
    return {
      ...state,
      recipes: [...state.recipes, action.payload],
    };
  }),
  on(updateRecipe, (state, action) => {
    return {
      ...state,
      recipes: state.recipes.map((r) =>
        r.id === action.payload.id ? action.payload : r
      ),
    };
  }),
  on(removeRecipe, (state, action) => {
    return {
      ...state,
      recipes: state.recipes.filter((r) => r.id !== action.payload),
    };
  }),
  on(startEditingRecipe, (state, action) => {
    return {
      ...state,
      editingRecipe: action.payload,
    };
  }),
  on(stopEditingRecipe, (state) => {
    return {
      ...state,
      editingRecipe: null,
    };
  }),
  on(setFetchingRecipes, (state, action) => {
    return {
      ...state,
      isFetching: action.payload,
    };
  })
);
