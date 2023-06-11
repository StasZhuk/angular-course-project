import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { getRandomDigit } from 'src/app/helpers/numbers';
import { REG_EXP_POSITIVE_NUMBERS } from 'src/app/constants/regexp';

import { Ingredient } from 'src/app/models/ingredient.model';
import { Recipe } from 'src/app/models/recipe.model';
import { addRecipe, updateRecipe } from 'src/app/store/actions/recipes.actions';
import { Store } from '@ngrx/store';
import { AppStoreState } from 'src/app/store/store-root.reducer';
import { selectRecipe } from 'src/app/store/selectors/recipes.selectors';
import { map, of, switchMap, take, tap } from 'rxjs';

const INIT_RECIPE_STATE: Recipe = {
  name: '',
  description: '',
  imgPath: '',
  ingredients: [],
};

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss'],
})
export class RecipeEditComponent implements OnInit {
  editMode: boolean = false;
  id: number;
  recipe: Recipe;
  recipeForm: FormGroup;

  get ingredientsControls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppStoreState>
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        map(({ recipeId }) => {
          return Number(recipeId);
        }),
        tap((recipeId) => {
          this.editMode = recipeId ? true : false;
        }),
        switchMap((recipeId) => {
          if (this.editMode) {
            return this.store.select(selectRecipe(+recipeId));
          } else {
            return of({ ...INIT_RECIPE_STATE });
          }
        })
      )
      .subscribe((recipe) => {
        this.recipe = recipe;
        this.initForm();
      });
  }

  private initForm() {
    const ingredientsArray: FormGroup[] = [];

    if (this.editMode) {
      this.recipe.ingredients.forEach((ingredient) =>
        ingredientsArray.push(this.createIngredientGroup(ingredient))
      );
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(this.recipe.name, [
        Validators.required,
        Validators.minLength(1),
      ]),
      description: new FormControl(this.recipe.description, [
        Validators.required,
        Validators.minLength(5),
      ]),
      imgPath: new FormControl(this.recipe.imgPath, [Validators.required]),
      ingredients: new FormArray(ingredientsArray, [Validators.minLength(1)]),
    });
  }

  onSubmit() {
    const recipeData: Recipe = {
      id: this.recipe.id,
      ...this.recipeForm.value,
    };

    if (this.editMode) {
      this.store.dispatch(updateRecipe({ payload: recipeData }));
    } else {
      this.store.dispatch(addRecipe({ payload: new Recipe(recipeData) }));
    }

    this.onBack();
  }

  onBack() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  createIngredientGroup(ingredient: Ingredient | null): FormGroup {
    return new FormGroup({
      id: new FormControl(ingredient ? ingredient.id : getRandomDigit(), [
        Validators.required,
      ]),
      name: new FormControl(ingredient ? ingredient.name : null, [
        Validators.required,
      ]),
      amount: new FormControl(ingredient ? ingredient.amount : null, [
        Validators.required,
        Validators.pattern(REG_EXP_POSITIVE_NUMBERS),
      ]),
    });
  }

  onAddIngredient() {
    const ingredientsControl = <FormArray>this.recipeForm.get('ingredients');
    const newControl = this.createIngredientGroup(null);
    ingredientsControl.push(newControl);
  }

  onRemoveIngredient(idx: number) {
    const ingredientsControl = <FormArray>this.recipeForm.get('ingredients');
    ingredientsControl.removeAt(idx);
  }
}
