import { Observable, Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

import { Ingredient } from 'src/app/models/ingredient.model';
import {
  selectEditingIngredient,
  selectIngredients,
} from 'src/app/store/selectors/shopping-list.selectors';
import {
  startEditingIngredient,
  stopEditingIngredient,
} from 'src/app/store/actions/shopping-list.actions';
import { AppStoreState } from 'src/app/store/store-root.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
  animations: [
    trigger('list', [
      state(
        'in',
        style({
          opacity: 1,
          transform: 'translateX(0)',
        })
      ),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-100px)',
        }),
        animate(300),
      ]),
      transition('* => void', [
        animate(
          300,
          style({
            opacity: 0,
            transform: 'translateX(100px)',
          })
        ),
      ]),
    ]),
  ],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients$: Observable<Ingredient[]>;
  editingSubscription: Subscription;
  activeId: Number;

  constructor(private store: Store<AppStoreState>) {}

  ngOnInit(): void {
    this.ingredients$ = this.store.select(selectIngredients);
    this.editingSubscription = this.store
      .select(selectEditingIngredient)
      .subscribe((ingredient) => {
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
    this.editingSubscription.unsubscribe();
    this.store.dispatch(stopEditingIngredient());
  }
}
