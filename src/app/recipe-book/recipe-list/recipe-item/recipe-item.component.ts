import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss'],
})
export class RecipeItemComponent {
  @Output() recipeSelected = new EventEmitter<void>()
  @Input() recipe: Recipe

  onSelected(e:MouseEvent) {
    e.preventDefault()
    this.recipeSelected.emit()
  }
}
