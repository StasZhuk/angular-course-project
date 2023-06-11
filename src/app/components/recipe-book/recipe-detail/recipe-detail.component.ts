import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from 'src/app/models/recipe.model';
import { Store } from '@ngrx/store';
import { AppStoreState } from 'src/app/store/store-root.reducer';
import { selectRecipe } from 'src/app/store/selectors/recipes.selectors';
import { map, switchMap, take, tap } from 'rxjs';
import { addIngredients } from 'src/app/store/actions/shopping-list.actions';
import { removeRecipe } from 'src/app/store/actions/recipes.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;

  constructor(
    private store: Store<AppStoreState>,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        map(({ recipeId }) => +recipeId),
        switchMap((recipeId) => {
          return this.store.select(selectRecipe(Number(recipeId)));
        })
      )
      .subscribe((recipe) => {
        this.recipe = recipe;
      });
  }

  onAddIngredientsToShoppingList() {
    this.store.dispatch(addIngredients({ payload: this.recipe.ingredients }));
  }

  onDelete() {
    this.store.dispatch(removeRecipe({ payload: this.recipe.id }));
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
