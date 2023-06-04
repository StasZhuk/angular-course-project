import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  Input,
} from '@angular/core';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss'],
})
export class ShoppingEditComponent implements OnInit {
  @Input() ingredientForEdit: Ingredient = null;

  @ViewChild('inputName') inputNameRef: ElementRef;
  @ViewChild('inputAmount') inputAmountRef: ElementRef;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.shoppingListService.ingredientUpdated.subscribe(ingredient => {
      this.ingredientForEdit = ingredient
    })
  }

  onAddIngredient() {
    const newIngredient = new Ingredient({
      name: this.inputNameRef.nativeElement.value,
      amount: this.inputAmountRef.nativeElement.value,
    })

    this.shoppingListService.addIngredient(newIngredient);
    this.onClear()
  }

  onEditIngredient() {
    this.shoppingListService.editIngredient({
      id: this.ingredientForEdit.id,
      name: this.inputNameRef.nativeElement.value,
      amount: this.inputAmountRef.nativeElement.value,
    });
    this.onClear()
  }

  onClear() {
    this.inputNameRef.nativeElement.value = '';
    this.inputAmountRef.nativeElement.value = '';
    this.inputNameRef.nativeElement.focus();
    this.shoppingListService.clearIngredient()
  }
}
