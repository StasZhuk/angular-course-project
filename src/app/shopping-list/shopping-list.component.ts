import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../services/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[];

  constructor(private serviceShoppingList: ShoppingListService) {}

  ngOnInit(): void {
    this.ingredients = this.serviceShoppingList.getIngredients()
    this.serviceShoppingList.ingredientsUpdated.subscribe(ingredients => {
      this.ingredients = ingredients
    })
  }
}
