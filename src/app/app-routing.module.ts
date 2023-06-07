import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeBookComponent } from './recipe-book/recipe-book.component';
import { RecipeDetailComponent } from './recipe-book/recipe-detail/recipe-detail.component';
import { RecipeDetailEmptyComponent } from './recipe-book/recipe-detail-empty/recipe-detail-empty.component';
import { RecipeEditComponent } from './recipe-book/recipe-edit/recipe-edit.component';
import { FormsComponent } from './reactive-forms/forms.component';
import { recipesResolver } from './services/recipes-resolver.service';

const routes: Routes = [
  { path: '', redirectTo: 'recipe-book', pathMatch: 'full' },
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: 'forms', component: FormsComponent },
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
