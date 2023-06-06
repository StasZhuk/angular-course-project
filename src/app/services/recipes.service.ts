import { Injectable } from '@angular/core';
import { Recipe } from '../recipe-book/recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subject } from 'rxjs';

const RECIPES = [
  new Recipe({
    id: 1,
    name: 'Soup',
    description: 'Recipe of soup',
    imgPath:
      'https://lobsterhouse.ru/wp-content/uploads/0/f/3/0f39e936cf2762d8efcbd54fed33609a.jpeg',
    ingredients: [
      new Ingredient({
        id: 1,
        name: 'Cheese',
        amount: 12,
      }),
      new Ingredient({
        id: 2,
        name: 'Mushrooms',
        amount: 5,
      }),
    ],
  }),
  new Recipe({
    id: 2,
    name: 'Margarita',
    description: 'Pizza with chees',
    imgPath:
      'https://attuale.ru/wp-content/uploads/2018/04/27480bc65ec1a27aef9e1674aa7f8791.jpg',
    ingredients: [
      new Ingredient({
        id: 3,
        name: 'Milk',
        amount: 1,
      }),
      new Ingredient({
        id: 4,
        name: 'Orange juice',
        amount: 5,
      }),
    ],
  }),
];

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  recipes: Recipe[] = RECIPES;
  recipesUpdated = new Subject<Recipe[]>();

  constructor(private shoppingListService: ShoppingListService) {}

  getRecipes() {
    return [...this.recipes];
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
