import { Component } from '@angular/core';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipe-book',
  templateUrl: './recipe-book.component.html',
  styleUrls: ['./recipe-book.component.scss']
})
export class RecipeBookComponent {
  detailRecipe: Recipe = null

  setRecipe(recipe:Recipe) {
    this.detailRecipe = recipe
  }
}
