import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './components/shopping-list/shopping-edit/shopping-edit.component';
import { RecipeBookComponent } from './components/recipe-book/recipe-book.component';
import { RecipeListComponent } from './components/recipe-book/recipe-list/recipe-list.component';
import { RecipeEditComponent } from './components/recipe-book/recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './components/recipe-book/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './components/recipe-book/recipe-list/recipe-item/recipe-item.component';
import { RecipeDetailEmptyComponent } from './components/recipe-book/recipe-detail-empty/recipe-detail-empty.component';
import { IngredientItemComponent } from './components/shared/ingredient-item/ingredient-item.component';

import { BaseHighlightDirective } from './directives/base-highlight.directive';
import { BetterHighlightDirective } from './directives/better-highlight.directive';
import { UnlessDirective } from './directives/unless.directive';
import { DropdownDirective } from './directives/dropdown.directive';

import { AppRoutingModule } from './app-routing.module';
import { LogService } from './services/log.service';
import { ShortenPipe } from './pipes/shorten.pipe';
import { FilterPipe } from './pipes/filter.pipe';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [LogService],
  bootstrap: [AppComponent],
})
export class AppModule {}
