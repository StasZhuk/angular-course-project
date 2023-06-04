import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  ingredient: Ingredient = null;
  ingredients: Ingredient[] = [
    new Ingredient({
      name: 'Tomato',
      amount: 121,
    }),
  ];
  ingredientUpdated = new EventEmitter<Ingredient>();
  ingredientsUpdated = new EventEmitter<Ingredient[]>();

  constructor() {}

  getIngredients() {
    return [...this.ingredients];
  }

  addIngredient(newIngredient: Ingredient) {
    this.ingredients.push(newIngredient);
    this.ingredientsUpdated.emit(this.getIngredients())
  }

  addIngredients(newIngredients: Ingredient[]) {
    this.ingredients.push(...newIngredients);
    this.ingredientsUpdated.emit(this.getIngredients())
  }

  editIngredient(newIngredient: Ingredient) {
    this.ingredients = this.ingredients.map((ingredient: Ingredient) => {
      return ingredient.id === newIngredient.id ? newIngredient : ingredient;
    });
    this.ingredientUpdated.emit(newIngredient);
  }

  clearIngredient() {
    this.ingredientUpdated.emit(null);
  }

  deleteIngredient(ingredientId: number) {
    this.ingredients = this.ingredients.filter(
      (ingredient) => ingredient.id !== ingredientId
    );
    this.ingredientsUpdated.emit(this.getIngredients());
  }

  selectIngredient(ingredient: Ingredient) {
    this.ingredientUpdated.emit(ingredient);
  }
}
