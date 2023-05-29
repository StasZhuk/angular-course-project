import { Component } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent {
  ingredients: Ingredient[] = [
    new Ingredient({
      name: "Chess",
      amount: 10
    }),
    new Ingredient({
      name: "Tomato",
      amount: 21
    }),
  ]
}
