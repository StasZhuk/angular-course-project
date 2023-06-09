import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ShoppingListComponent } from 'src/app/components/shopping-list/shopping-list.component';
import { ShoppingEditComponent } from 'src/app/components/shopping-list/shopping-edit/shopping-edit.component';

import { SharedModule } from 'src/app/shared.module';
import { ShoppingListRoutingModule } from './shopping-list-routing.module';

@NgModule({
  declarations: [ShoppingListComponent, ShoppingEditComponent],
  imports: [ShoppingListRoutingModule, SharedModule, ReactiveFormsModule],
})
export class ShoppingListModule {}
