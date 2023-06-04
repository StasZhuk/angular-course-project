import { getRandomDigit } from "../helpers/numbers";

export class Ingredient {
  public id?: number;
  public name: string;
  public amount: number;

  constructor({ name, amount, id }:Ingredient) {
    this.id = id || getRandomDigit()
    this.name = name
    this.amount = amount
  }
}
