import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { Observable, take, tap } from 'rxjs';

import { Recipe } from 'src/app/models/recipe.model';
import { Store } from '@ngrx/store';
import { AppStoreState } from '../store/store-root.reducer';
import { selectRecipes } from '../store/selectors/recipes.selectors';
import { fetchRecipes } from '../store/actions/recipes.actions';

export const recipesResolver = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<Recipe[]> | null => {
  const store = inject(Store<AppStoreState>);

  return store.select(selectRecipes).pipe(
    take(1),
    tap((recipes) => {
      if (!recipes || !recipes.length) {
        store.dispatch(fetchRecipes());
      }
    })
  );
};
