import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from 'src/app/app.component';
import { HeaderComponent } from 'src/app/components/layout/header/header.component';
import { AuthComponent } from 'src/app/components/auth/auth.component';
import { ShoppingListComponent } from 'src/app/components/shopping-list/shopping-list.component';
import { ShoppingEditComponent } from 'src/app/components/shopping-list/shopping-edit/shopping-edit.component';
import { RecipeBookComponent } from 'src/app/components/recipe-book/recipe-book.component';
import { RecipeListComponent } from 'src/app/components/recipe-book/recipe-list/recipe-list.component';
import { RecipeEditComponent } from 'src/app/components/recipe-book/recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from 'src/app/components/recipe-book/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from 'src/app/components/recipe-book/recipe-list/recipe-item/recipe-item.component';
import { RecipeDetailEmptyComponent } from 'src/app/components/recipe-book/recipe-detail-empty/recipe-detail-empty.component';
import { IngredientItemComponent } from 'src/app/components/shared/ingredient-item/ingredient-item.component';

import { BaseHighlightDirective } from 'src/app/directives/base-highlight.directive';
import { BetterHighlightDirective } from 'src/app/directives/better-highlight.directive';
import { UnlessDirective } from 'src/app/directives/unless.directive';
import { DropdownDirective } from 'src/app/directives/dropdown.directive';

import { AppRoutingModule } from 'src/app/app-routing.module';
import { LogService } from 'src/app/services/log.service';
import { ShortenPipe } from 'src/app/pipes/shorten.pipe';
import { FilterPipe } from 'src/app/pipes/filter.pipe';

@NgModule({
  exports: [],
  declarations: [
    AppComponent,
    HeaderComponent,
    ShoppingListComponent,
    RecipeBookComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    ShoppingEditComponent,
    IngredientItemComponent,
    BaseHighlightDirective,
    BetterHighlightDirective,
    UnlessDirective,
    DropdownDirective,
    RecipeDetailEmptyComponent,
    RecipeEditComponent,
    ShortenPipe,
    FilterPipe,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [LogService],
  bootstrap: [AppComponent],
})
export class AppModule {}
