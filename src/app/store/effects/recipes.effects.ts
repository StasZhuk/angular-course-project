import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  fetchRecipes,
  saveRecipes,
  setFetchingRecipes,
  setRecipes,
} from '../actions/recipes.actions';
import { map, switchMap, take, tap, withLatestFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Recipe } from 'src/app/models/recipe.model';

import { API_URL } from 'src/app/constants/api';
import { AppStoreState } from '../store-root.reducer';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { selectRecipes } from '../selectors/recipes.selectors';

const RECIPES_URL = API_URL + 'recipes.json';

@Injectable()
export class RecipesEffect {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<AppStoreState>
  ) {}

  fetchRecipes = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchRecipes),
      tap(() => {
        this.store.dispatch(setFetchingRecipes({ payload: true }));
      }),
      switchMap(() => {
        return this.http.get<Recipe[]>(RECIPES_URL);
      }),
      map((recipes) => {
        return setRecipes({ payload: recipes });
      }),
      tap(() => {
        this.store.dispatch(setFetchingRecipes({ payload: false }));
      })
    );
  });

  saveRecipes = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(saveRecipes),
        withLatestFrom(this.store.select(selectRecipes)),
        switchMap(([action, recipes]) => {
          alert(action.type + ': Data saved');
          return this.http.put<Recipe[]>(RECIPES_URL, recipes);
        })
      );
    },
    { dispatch: false }
  );
}
