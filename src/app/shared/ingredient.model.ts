export class Ingredient {
  public id?: number;
  public name: string;
  public amount: number;

  constructor({ name, amount }:Ingredient) {
    this.id = Math.round((Math.random() + 1) * 1000)
    this.name = name
    this.amount = amount
  }
}
