import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../constants/api';
import { RecipesService } from './recipes.service';
import { Recipe } from '../recipe-book/recipe.model';
import { Subject, catchError, tap } from 'rxjs';

const RECIPES_URL = API_URL + 'recipes.json';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  isFetchingRecipes = new Subject<boolean>();
  isSavingRecipes = new Subject<boolean>();

  constructor(
    private http: HttpClient,
    private recipeService: RecipesService
  ) {}

  fetchRecipeData() {
    this.isFetchingRecipes.next(true);

    return this.http.get<Recipe[]>(RECIPES_URL).pipe(
      tap((recipes) => {
        this.recipeService.setRecipes(recipes);
        this.isFetchingRecipes.next(false);
      })
    );
  }

  saveRecipeData() {
    this.isSavingRecipes.next(true);

    return this.http
      .put<Recipe[]>(RECIPES_URL, this.recipeService.getRecipes())
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
