import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Recipe } from 'src/app/models/recipe.model';
import { AppStoreState } from 'src/app/store/store-root.reducer';
import { Store } from '@ngrx/store';
import {
  selectRecipes,
  selectRecipesFetching,
} from 'src/app/store/selectors/recipes.selectors';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit {
  recipes$: Observable<Recipe[]>;
  isFetching$: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppStoreState>
  ) {}

  ngOnInit(): void {
    this.recipes$ = this.store.select(selectRecipes);
    this.isFetching$ = this.store.select(selectRecipesFetching);
  }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
