import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Recipe } from 'src/app/components/recipe-book/recipe.model';
import { Ingredient } from 'src/app/components/shared/ingredient.model';

import { ShoppingListService } from './shopping-list.service';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  recipes: Recipe[];
  recipesUpdated = new Subject<Recipe[]>();

  constructor(private shoppingListService: ShoppingListService) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesUpdated.next(this.recipes);
  }

  getRecipes() {
    return this.recipes ? [...this.recipes] : this.recipes;
  }

  getRecipe(id: number) {
    return this.recipes.find((r) => r.id === id);
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  createRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesUpdated.next(this.recipes);
  }

  updateRecipe(recipe: Recipe) {
    this.recipes = this.recipes.map((r) => (r.id === recipe.id ? recipe : r));
    this.recipesUpdated.next(this.recipes);
  }

  deleteRecipe(recipeId: number) {
    this.recipes = this.recipes.filter((r) => r.id !== recipeId);
    this.recipesUpdated.next(this.recipes);
  }
}
