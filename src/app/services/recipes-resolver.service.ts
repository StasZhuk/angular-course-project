import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { StorageService } from './storage.service';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

import { Recipe } from 'src/app/models/recipe.model';
import { RecipesService } from './recipes.service';

export const recipesResolver = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<Recipe[]> | null => {
  const recipeService = inject(RecipesService);
  const storageService = inject(StorageService);

  if (!recipeService.getRecipes()) {
    return storageService.fetchRecipeData();
  }

  return null;
};
