import { getRandomDigit } from 'src/app/helpers/numbers';
import { Ingredient } from './ingredient.model';

export class Recipe {
  public id?: number;
  public name: string;
  public description: string;
  public imgPath: string;
  public ingredients?: Ingredient[];

  constructor({ name, description, imgPath, ingredients = [], id }: Recipe) {
    this.id = id || getRandomDigit();
    this.name = name;
    this.description = description;
    this.imgPath = imgPath;
    this.ingredients = ingredients;
  }
}
