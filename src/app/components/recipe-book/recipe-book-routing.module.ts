import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { RecipeEditComponent } from 'src/app/components/recipe-book/recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from 'src/app/components/recipe-book/recipe-detail/recipe-detail.component';
import { RecipeDetailEmptyComponent } from 'src/app/components/recipe-book/recipe-detail-empty/recipe-detail-empty.component';
import { RecipeBookComponent } from 'src/app/components/recipe-book/recipe-book.component';
import { authGuard } from 'src/app/components/auth/auth.guard';

import { recipesResolver } from 'src/app/services/recipes-resolver.service';

const recipeRoutes: Route[] = [
  {
    path: 'recipe-book',
    component: RecipeBookComponent,
    resolve: [recipesResolver],
    canActivate: [authGuard],
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
  imports: [RouterModule.forChild(recipeRoutes)],
  exports: [RouterModule],
})
export class RecipeBookRoutingModule {}
