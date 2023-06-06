import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Recipe } from './../recipe.model';
import { RecipesService } from 'src/app/services/recipes.service';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { getRandomDigit } from 'src/app/helpers/numbers';

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
  ingredientsControls: AbstractControl[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipesService: RecipesService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(({ recipeId }) => {
      this.editMode = recipeId !== undefined;
      this.id = this.editMode ? +recipeId : null;
      this.initForm();
    });
  }

  private initForm() {
    this.recipe = this.editMode
      ? this.recipesService.getRecipe(this.id)
      : INIT_RECIPE_STATE;

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

    const ingredientsControls = <FormArray>this.recipeForm.get('ingredients');
    this.ingredientsControls = ingredientsControls.controls;
  }

  onSubmit() {
    const recipeData: Recipe = new Recipe({
      id: this.id,
      ...this.recipeForm.value,
    });

    if (this.editMode) {
      this.recipesService.updateRecipe(recipeData);
    } else {
      this.recipesService.createRecipe(recipeData);
    }

    this.onBack()
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
