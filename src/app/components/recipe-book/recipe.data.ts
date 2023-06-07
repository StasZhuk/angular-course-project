import { Recipe } from 'src/app/models/recipe.model';
import { Ingredient } from 'src/app/models/ingredient.model';

export const RECIPES_MOCK = [
  new Recipe({
    id: 1,
    name: 'Soup',
    description: 'Recipe of soup',
    imgPath:
      'https://lobsterhouse.ru/wp-content/uploads/0/f/3/0f39e936cf2762d8efcbd54fed33609a.jpeg',
    ingredients: [
      new Ingredient({
        id: 1,
        name: 'Cheese',
        amount: 12,
      }),
      new Ingredient({
        id: 2,
        name: 'Mushrooms',
        amount: 5,
      }),
    ],
  }),
  new Recipe({
    id: 2,
    name: 'Margarita',
    description: 'Pizza with chees',
    imgPath:
      'https://attuale.ru/wp-content/uploads/2018/04/27480bc65ec1a27aef9e1674aa7f8791.jpg',
    ingredients: [
      new Ingredient({
        id: 3,
        name: 'Milk',
        amount: 1,
      }),
      new Ingredient({
        id: 4,
        name: 'Orange juice',
        amount: 5,
      }),
    ],
  }),
];
