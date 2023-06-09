import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { RecipeListComponent } from 'src/app/components/recipe-book/recipe-list/recipe-list.component';
import { RecipeEditComponent } from 'src/app/components/recipe-book/recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from 'src/app/components/recipe-book/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from 'src/app/components/recipe-book/recipe-list/recipe-item/recipe-item.component';
import { RecipeDetailEmptyComponent } from 'src/app/components/recipe-book/recipe-detail-empty/recipe-detail-empty.component';
import { RecipeBookComponent } from 'src/app/components/recipe-book/recipe-book.component';

import { SharedModule } from 'src/app/shared.module';
import { RecipeBookRoutingModule } from './recipe-book-routing.module';

@NgModule({
  declarations: [
    RecipeBookComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeEditComponent,
    RecipeDetailComponent,
    RecipeDetailEmptyComponent,
  ],
  imports: [SharedModule, RecipeBookRoutingModule, ReactiveFormsModule],
})
export class RecipeBookModule {}
