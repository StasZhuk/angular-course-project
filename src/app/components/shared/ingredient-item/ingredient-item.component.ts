import { Component, Input } from '@angular/core';

import { Ingredient } from 'src/app/models/ingredient.model';
import { Store } from '@ngrx/store';
import { removeIngredient } from 'src/app/store/actions/shopping-list.actions';

@Component({
  selector: 'app-ingredient-item',
  templateUrl: './ingredient-item.component.html',
  styleUrls: ['./ingredient-item.component.scss'],
})
export class IngredientItemComponent {
  @Input() ingredient: Ingredient;
  @Input() active: boolean;
  @Input() canDelete: boolean = false;

  constructor(private store: Store) {}

  onDelete() {
    this.store.dispatch(removeIngredient({ payload: this.ingredient.id }));
  }
}
