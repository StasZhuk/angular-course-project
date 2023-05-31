import {
  Component,
  EventEmitter,
  Output,
  ElementRef,
  ViewChild,
  Input,
} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss'],
})
export class ShoppingEditComponent {
  @Input() ingredientForEdit: Ingredient = null;
  @Output() ingredientAdded = new EventEmitter<Ingredient>();
  @Output() ingredientEdited = new EventEmitter<Ingredient>();
  @Output() ingredientCleared = new EventEmitter<void>();

  @ViewChild('inputName') inputNameRef: ElementRef;
  @ViewChild('inputAmount') inputAmountRef: ElementRef;

  onAddIngredient() {
    const newIngredient = new Ingredient({
      name: this.inputNameRef.nativeElement.value,
      amount: this.inputAmountRef.nativeElement.value,
    })

    this.ingredientAdded.emit(newIngredient);
    this.onClear()
  }

  onEditIngredient() {
    this.ingredientEdited.emit({
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
    this.ingredientCleared.emit();
  }
}
