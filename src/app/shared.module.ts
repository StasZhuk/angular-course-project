import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IngredientItemComponent } from 'src/app/components/shared/ingredient-item/ingredient-item.component';
import { ButtonComponent } from 'src/app/components/base/button/button.component';
import { SpinnerComponent } from 'src/app/components/base/spinner/spinner.component';
import { AlertComponent } from 'src/app/components/base/alert/alert.component';

import { BaseHighlightDirective } from 'src/app/directives/base-highlight.directive';
import { BetterHighlightDirective } from 'src/app/directives/better-highlight.directive';
import { UnlessDirective } from 'src/app/directives/unless.directive';
import { DropdownDirective } from 'src/app/directives/dropdown.directive';
import { RefDirective } from 'src/app/directives/ref.directive';

import { ShortenPipe } from 'src/app/pipes/shorten.pipe';
import { FilterPipe } from 'src/app/pipes/filter.pipe';

const declarations = [
  BetterHighlightDirective,
  BaseHighlightDirective,
  DropdownDirective,
  UnlessDirective,
  RefDirective,
  FilterPipe,
  ShortenPipe,
  AlertComponent,
  ButtonComponent,
  SpinnerComponent,
  IngredientItemComponent,
];

@NgModule({
  declarations,
  imports: [CommonModule],
  exports: [CommonModule, ...declarations],
})
export class SharedModule {}
