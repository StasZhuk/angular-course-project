import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Ingredient } from '../ingredient.model';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ingredient-item',
  templateUrl: './ingredient-item.component.html',
  styleUrls: ['./ingredient-item.component.scss'],
})
export class IngredientItemComponent {
  @Input() ingredient: Ingredient;
  @Input() active: boolean;
  @Output() deletedItem = new EventEmitter<number>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private shoppingListService: ShoppingListService,
  ) {}

  onDelete() {
    this.shoppingListService.deleteIngredient(this.ingredient.id);
  }

  onSelect() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        id: this.ingredient.id,
      },
    });
  }
}
