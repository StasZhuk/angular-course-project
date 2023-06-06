import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../services/shopping-list.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  recipesServiceSubscription: Subscription;
  activeId: Number;

  constructor(private route: ActivatedRoute, private serviceShoppingList: ShoppingListService) {}

  ngOnInit(): void {
    this.ingredients = this.serviceShoppingList.getIngredients();
    this.recipesServiceSubscription = this.serviceShoppingList.ingredientsUpdated.subscribe((ingredients) => {
      this.ingredients = ingredients;
    });

    this.route.queryParams.subscribe(({ id }) => {
        this.activeId = id ? Number(id) : undefined
    })
  }

  ngOnDestroy(): void {
    this.recipesServiceSubscription.unsubscribe()
  }
}
