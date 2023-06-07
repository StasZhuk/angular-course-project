import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { RecipesService } from 'src/app/services/recipes.service';
import { StorageService } from 'src/app/services/storage.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  recipesServiceSubscription: Subscription;
  isFetching: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storageService: StorageService,
    private recipesService: RecipesService
  ) {}

  ngOnInit(): void {
    this.recipes = this.recipesService.getRecipes();

    this.recipesServiceSubscription =
      this.recipesService.recipesUpdated.subscribe((recipes) => {
        this.recipes = recipes;
      });

    this.storageService.isFetchingRecipes.subscribe(
      (fetching) => (this.isFetching = fetching)
    );
  }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.recipesServiceSubscription.unsubscribe();
  }
}
