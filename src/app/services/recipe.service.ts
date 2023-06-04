import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe-book/recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipes: Recipe[] = [
    new Recipe({
      name: 'Soup',
      description: 'Recipe of soup',
      imgPath:
        'https://lobsterhouse.ru/wp-content/uploads/0/f/3/0f39e936cf2762d8efcbd54fed33609a.jpeg',
      ingredients: [
        new Ingredient({
          name: 'Cheese',
          amount: 12,
        }),
        new Ingredient({
          name: 'Mushrooms',
          amount: 5,
        }),
      ],
    }),
    new Recipe({
      name: 'Margarita',
      description: 'Pizza with chees',
      imgPath:
        'https://attuale.ru/wp-content/uploads/2018/04/27480bc65ec1a27aef9e1674aa7f8791.jpg',
      ingredients: [
        new Ingredient({
          name: 'Milk',
          amount: 1,
        }),
        new Ingredient({
          name: 'Orange juice',
          amount: 5,
        }),
      ],
    }),
  ];
  detailRecipeSelected = new EventEmitter<Recipe>();
  recipesUpdated = new EventEmitter<Recipe[]>();

  constructor(private shoppingListService: ShoppingListService) {}

  getRecipes() {
    return [...this.recipes];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}
