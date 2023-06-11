import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, switchMap, take, tap } from 'rxjs';

import { API_URL } from 'src/app/constants/api';
import { Recipe } from 'src/app/models/recipe.model';

import { AppStoreState } from '../store/store-root.reducer';
import { Store } from '@ngrx/store';
import { setRecipes } from '../store/actions/recipes.actions';
import { selectRecipes } from '../store/selectors/recipes.selectors';

const RECIPES_URL = API_URL + 'recipes.json';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  isFetchingRecipes = new Subject<boolean>();
  isSavingRecipes = new Subject<boolean>();

  constructor(private http: HttpClient, private store: Store<AppStoreState>) {}

  fetchRecipeData() {
    this.isFetchingRecipes.next(true);

    return this.http.get<Recipe[]>(RECIPES_URL).pipe(
      tap((recipes) => {
        this.store.dispatch(setRecipes({ payload: recipes }));
        this.isFetchingRecipes.next(false);
      })
    );
  }

  saveRecipeData() {
    this.isSavingRecipes.next(true);

    return this.store
      .select(selectRecipes)
      .pipe(
        take(1),
        switchMap((recipes) => {
          console.log(recipes);
          return this.http.put<Recipe[]>(RECIPES_URL, recipes);
        })
      )
      .subscribe({
        next: () => {
          this.isSavingRecipes.next(false);
          alert('Data saved');
        },
        error: (error) => {
          this.isSavingRecipes.next(false);
          alert(`Data saving error: ${JSON.stringify(error)}`);
        },
      });
  }
}
