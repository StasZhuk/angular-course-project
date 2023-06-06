import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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
  id: number;
  shoppingForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private shoppingService: ShoppingListService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(({ id }) => {
      this.editMode = id !== undefined;
      this.id = this.editMode ? Number(id) : undefined;
      this.initForm();
    });
  }

  private initForm() {
    this.ingredient = this.editMode
      ? this.shoppingService.getIngredient(this.id)
      : INIT_INGREDIENT_STATE;

    this.shoppingForm = new FormGroup({
      name: new FormControl(this.ingredient.name, [Validators.required]),
      amount: new FormControl(this.ingredient.amount, [Validators.required]),
    });
  }

  onSubmit() {
    const submitData: Ingredient = {
      id: this.id,
      name: this.shoppingForm.value.name,
      amount: this.shoppingForm.value.amount,
    };

    if (this.editMode) {
      this.shoppingService.editIngredient(submitData);
    } else {
      this.shoppingService.addIngredient(new Ingredient(submitData));
    }

    this.onClear();
  }

  onClear() {
    this.shoppingForm.reset();

    if (this.id) {
      this.router.navigate([], { relativeTo: this.route, queryParams: {} });
    }
  }
}
