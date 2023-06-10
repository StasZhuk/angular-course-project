import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { RecipesService } from 'src/app/services/recipes.service';
import { Recipe } from 'src/app/models/recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;

  constructor(
    private recipesService: RecipesService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(({ recipeId }:Params) => {
      this.recipe = this.recipesService.getRecipe(Number(recipeId))
    })
  }

  onAddIngredientsToShoppingList() {
    this.recipesService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onDelete() {
    this.recipesService.deleteRecipe(this.recipe.id)
    this.router.navigate(['../'], { relativeTo: this.route })
  }
}
