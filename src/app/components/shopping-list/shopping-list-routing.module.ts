import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ShoppingListComponent } from 'src/app/components/shopping-list/shopping-list.component';
import { authGuard } from 'src/app/components/auth/auth.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'shopping-list',
        component: ShoppingListComponent,
        canActivate: [authGuard],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class ShoppingListRoutingModule {}
