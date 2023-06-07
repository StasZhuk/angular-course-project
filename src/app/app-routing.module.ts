import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { RecipeBookComponent } from './components/recipe-book/recipe-book.component';
import { RecipeDetailComponent } from './components/recipe-book/recipe-detail/recipe-detail.component';
import { RecipeDetailEmptyComponent } from './components/recipe-book/recipe-detail-empty/recipe-detail-empty.component';
import { RecipeEditComponent } from './components/recipe-book/recipe-edit/recipe-edit.component';

import { recipesResolver } from './services/recipes-resolver.service';

const routes: Routes = [
  { path: '', redirectTo: 'recipe-book', pathMatch: 'full' },
  { path: 'shopping-list', component: ShoppingListComponent },
  {
    path: 'recipe-book',
    component: RecipeBookComponent,
    resolve: [recipesResolver],
    children: [
      { path: '', component: RecipeDetailEmptyComponent },
      { path: 'new', component: RecipeEditComponent },
      {
        path: ':recipeId',
        component: RecipeDetailComponent,
        resolve: [recipesResolver],
      },
      {
        path: ':recipeId/edit',
        component: RecipeEditComponent,
        resolve: [recipesResolver],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
