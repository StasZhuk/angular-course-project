import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { shoppingListReducer } from './reducers/shopping-list.reducer';
import { authReducer } from './reducers/auth.reducer';

const store = {
  shoppingList: shoppingListReducer,
  auth: authReducer,
};

@NgModule({
  imports: [StoreModule.forRoot(store)],
  exports: [StoreModule],
})
export class AppStoreModule {}
