export class Recipe {
  public name: string;
  public description: string;
  public imgPath: string;

  constructor({ name, description, imgPath }:Recipe) {
    this.name = name
    this.description = description
    this.imgPath = imgPath
  }
}
