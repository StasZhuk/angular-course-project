export class Ingredient {
  public name: string;
  public amount: number;

  constructor({ name, amount }:Ingredient) {
    this.name = name
    this.amount = amount
  }
}
