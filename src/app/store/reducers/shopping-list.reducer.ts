import { createReducer, on } from '@ngrx/store';
import { Ingredient } from 'src/app/models/ingredient.model';
import {
  addIngredient,
  addIngredients,
  removeIngredient,
  startEditingIngredient,
  stopEditingIngredient,
  updateIngredient,
} from '../actions/shopping-list.actions';

export interface ShoppingListInitialState {
  ingredients: Ingredient[];
  editIngredient: Ingredient;
}

const initialState: ShoppingListInitialState = {
  ingredients: [
    new Ingredient({
      id: 3,
      name: 'Tomato',
      amount: 121,
    }),
  ],
  editIngredient: null,
};

// new version
export const shoppingListReducer = createReducer(
  initialState,
  on(addIngredient, (state, action) => {
    return {
      ...state,
      ingredients: [...state.ingredients, action.payload],
    };
  }),
  on(addIngredients, (state, action) => {
    return {
      ...state,
      ingredients: [...state.ingredients, ...action.payload],
    };
  }),
  on(updateIngredient, (state, action) => {
    return {
      ...state,
      ingredients: state.ingredients.map((i) =>
        i.id === action.payload.id ? action.payload : i
      ),
    };
  }),
  on(removeIngredient, (state, action) => {
    return {
      ...state,
      ingredients: state.ingredients.filter((i) => i.id !== action.payload),
    };
  }),
  on(startEditingIngredient, (state, action) => {
    const ingredientForEdit = state.ingredients.find(
      (i) => i.id === action.payload
    );

    if (ingredientForEdit) {
      return {
        ...state,
        editIngredient: { ...ingredientForEdit },
      };
    }

    return state;
  }),
  on(stopEditingIngredient, (state) => {
    return {
      ...state,
      editIngredient: null,
    };
  })
);

// old version
// export function shoppingListReducer(
//   state = initialState,
//   action: ShoppingListActions | Action
// ) {
//   switch (action.type) {
//     case ADD_INGREDIENTS_TYPE: {
//       const { payload } = action as AddIngredientAction;

//       return {
//         ...state,
//         ingredients: [...state.ingredients, payload],
//       };
//     }

//     case UPDATE_INGREDIENTS_TYPE: {
//       const { payload } = action as UpdateIngredientAction;

//       return {
//         ...state,
//         ingredients: state.ingredients.map((i) =>
//           i.id === payload.id ? payload : i
//         ),
//       };
//     }

//     case REMOVE_INGREDIENTS_TYPE: {
//       const { payload } = action as RemoveIngredientAction;

//       return {
//         ...state,
//         ingredients: state.ingredients.filter((i) => i.id !== payload),
//       };
//     }

//     default:
//       break;
//   }
//   return state;
// }
