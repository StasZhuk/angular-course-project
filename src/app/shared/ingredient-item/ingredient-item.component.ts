import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Ingredient } from '../ingredient.model';
import { ShoppingListService } from 'src/app/services/shopping-list.service';

@Component({
  selector: 'app-ingredient-item',
  templateUrl: './ingredient-item.component.html',
  styleUrls: ['./ingredient-item.component.scss'],
})
export class IngredientItemComponent {
  @Input() ingredient: Ingredient;
  @Output() deletedItem = new EventEmitter<number>();

  constructor(private shoppingListService: ShoppingListService) {}

  onDelete(id:number) {
    this.shoppingListService.deleteIngredient(this.ingredient.id)
  }

  onSelect() {
    this.shoppingListService.selectIngredient(this.ingredient)
  }
}
