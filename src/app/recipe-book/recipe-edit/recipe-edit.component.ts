import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Recipe } from './../recipe.model';
import { RecipesService } from 'src/app/services/recipes.service';
import { Ingredient } from 'src/app/shared/ingredient.model';

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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipesService: RecipesService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(({ recipeId }) => {
      this.editMode = recipeId !== undefined;
      this.id = this.editMode ? +recipeId : null;

      this.recipe = this.editMode
        ? this.recipesService.getRecipe(this.id)
        : INIT_RECIPE_STATE;

      this.recipeForm = new FormGroup({
        name: new FormControl(this.recipe.name, [Validators.required, Validators.minLength(1)]),
        description: new FormControl(this.recipe.description, [Validators.required, Validators.minLength(5)]),
        imgPath: new FormControl(this.recipe.imgPath, [Validators.required]),
        ingredients: new FormArray([], [Validators.minLength(1)]),
      });
    });

  }

  onSubmit() {
    const recipeData:Recipe = new Recipe({
      id: this.id,
      ...this.recipeForm.value
    })

    if (this.editMode) {
      this.recipesService.updateRecipe(recipeData)
    } else {
      this.recipesService.createRecipe(recipeData)
    }
  }

  onBack() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }


}
