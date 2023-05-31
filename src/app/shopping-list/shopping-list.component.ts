import { Component, Input } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent {
  ingredients: Ingredient[] = [];
  editIngredient: Ingredient = null;

  onAddedIngredient(newIngredient: Ingredient) {
    this.ingredients.push(newIngredient)
    console.log(this.ingredients)
  };
  onEditedIngredient(editedIngredient: Ingredient) {
    console.log(editedIngredient, this.editIngredient)
    console.log(this.ingredients)
    this.editIngredient = null
    this.ingredients = this.ingredients.map((ingredient:Ingredient) => {
      return ingredient.id === editedIngredient.id
        ? editedIngredient
        : ingredient
    })
  };
  onClearIngredient() {
    this.editIngredient = null
  }
  onDeleteIngredient(ingredientId: number) {
    this.ingredients = this.ingredients.filter((ingredient) => ingredient.id !== ingredientId)
  }
  onSelectIngredient(ingredient: Ingredient) {
    this.editIngredient = ingredient
  }
}
