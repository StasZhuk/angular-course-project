import { Observable, Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Ingredient } from 'src/app/models/ingredient.model';
import { ShoppingListInitialState } from 'src/app/store/reducers/shopping-list.reducer';
import {
  selectEditingIngredient,
  selectIngredients,
} from 'src/app/store/selectors/shopping-list.selectors';
import {
  startEditingIngredient,
  stopEditingIngredient,
} from 'src/app/store/actions/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients$: Observable<Ingredient[]>;
  editingSubscription: Subscription;
  activeId: Number;

  constructor(
    private store: Store<{ shoppingList: ShoppingListInitialState }>
  ) {}

  ngOnInit(): void {
    this.ingredients$ = this.store.select(selectIngredients);
    this.editingSubscription = this.store.select(selectEditingIngredient).subscribe((ingredient) => {
      this.activeId = ingredient ? ingredient.id : null;
    });
  }

  onToggleSelect(id: number) {
    if (this.activeId === id) {
      this.store.dispatch(stopEditingIngredient());
    } else {
      this.store.dispatch(startEditingIngredient({ payload: id }));
    }
  }

  ngOnDestroy(): void {
    this.editingSubscription.unsubscribe()
    this.store.dispatch(stopEditingIngredient());
  }
}
