import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Ingredient } from 'src/app/components/shared/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  ingredients: Ingredient[] = [
    new Ingredient({
      id: 3,
      name: 'Tomato',
      amount: 121,
    }),
  ];
  ingredientsUpdated = new Subject<Ingredient[]>();

  constructor() {}

  getIngredients() {
    return [...this.ingredients];
  }

  getIngredient(ingredientId: number) {
    return this.ingredients.find((i) => i.id === ingredientId);
  }

  addIngredient(newIngredient: Ingredient) {
    this.ingredients.push(newIngredient);
    this.ingredientsUpdated.next(this.ingredients);
  }

  addIngredients(newIngredients: Ingredient[]) {
    this.ingredients.push(...newIngredients);
    this.ingredientsUpdated.next(this.ingredients);
  }

  editIngredient(editIngredient: Ingredient) {
    this.ingredients = this.ingredients.map((i: Ingredient) => {
      return i.id === editIngredient.id ? editIngredient : i;
    });
    this.ingredientsUpdated.next(this.ingredients);
  }

  deleteIngredient(ingredientId: number) {
    this.ingredients = this.ingredients.filter(
      (ingredient) => ingredient.id !== ingredientId
    );
    this.ingredientsUpdated.next(this.ingredients);
  }
}
