import { Component, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent {
  @Output() recipeWasSelected: EventEmitter<Recipe> = new EventEmitter()

  recipes: Recipe[] = [
    new Recipe({
      name: "Soup",
      description: "Recipe of soup",
      imgPath: "https://lobsterhouse.ru/wp-content/uploads/0/f/3/0f39e936cf2762d8efcbd54fed33609a.jpeg",
    }),
    {
      name: "Margarita",
      description: "Pizza with chees",
      imgPath: "https://attuale.ru/wp-content/uploads/2018/04/27480bc65ec1a27aef9e1674aa7f8791.jpg",
    },
  ];

  onRecipeSelected(recipe:Recipe) {
    this.recipeWasSelected.emit(recipe)
  }
}
