import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Ingredient } from '../ingredient.model';

@Component({
  selector: 'app-ingredient-item',
  templateUrl: './ingredient-item.component.html',
  styleUrls: ['./ingredient-item.component.scss'],
})
export class IngredientItemComponent {
  @Input() ingredient: Ingredient;
  @Input() isActive: boolean;
  @Output() deletedItem = new EventEmitter<number>();

  onDelete(id:number) {
    this.deletedItem.emit(id)
  }
}
