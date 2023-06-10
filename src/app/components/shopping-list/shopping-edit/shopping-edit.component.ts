import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { REG_EXP_POSITIVE_NUMBERS } from 'src/app/constants/regexp';
import { Ingredient } from 'src/app/models/ingredient.model';
import {
  addIngredient,
  stopEditingIngredient,
  updateIngredient,
} from 'src/app/store/actions/shopping-list.actions';
import { selectEditingIngredient } from 'src/app/store/selectors/shopping-list.selectors';
import { AppStoreState } from 'src/app/store/store-root.reducer';

const INIT_INGREDIENT_STATE: Ingredient = {
  name: null,
  amount: null,
};

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss'],
})
export class ShoppingEditComponent implements OnInit {
  editMode: boolean = false;
  ingredient: Ingredient;
  shoppingForm: FormGroup;
  editingSubscription: Subscription;

  constructor(private store: Store<AppStoreState>) {}

  ngOnInit(): void {
    this.editingSubscription = this.store
      .select(selectEditingIngredient)
      .subscribe((editingIngredient) => {
        if (editingIngredient) {
          this.editMode = true;
          this.ingredient = editingIngredient;
        } else {
          this.editMode = false;
          this.ingredient = { ...INIT_INGREDIENT_STATE };
        }
        this.initForm();
      });
  }

  private initForm() {
    this.shoppingForm = new FormGroup({
      name: new FormControl(this.ingredient.name, [Validators.required]),
      amount: new FormControl(this.ingredient.amount, [
        Validators.required,
        Validators.pattern(REG_EXP_POSITIVE_NUMBERS),
      ]),
    });
  }

  onSubmit() {
    const submitData = new Ingredient({
      id: this.ingredient.id,
      name: this.shoppingForm.value.name,
      amount: this.shoppingForm.value.amount,
    });

    if (this.editMode) {
      this.store.dispatch(updateIngredient({ payload: submitData }));
    } else {
      this.store.dispatch(addIngredient({ payload: submitData }));
    }

    this.onClear();
  }

  onClear() {
    this.shoppingForm.reset();
    this.store.dispatch(stopEditingIngredient());
    this.editingSubscription.unsubscribe();
  }
}
