import {
  GET_ITEMS_SUCCESS,
  GET_ITEMS_FAILED,
  SET_CURRENT_INGREDIENT,
  CLEAR_CURRENT_INGREDIENT,
  ADD_INGREDIENT_TO_CONSTRUCTOR,
  REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
  REMOVE_ALL_BUNS_FROM_CONSTRUCTOR,
  REMOVE_ALL_INGREDIENTS_FROM_CONSTRUCTOR,
  PLACE_ORDER_SUCCESS,
  PLACE_ORDER_FAILED,
  UPDATE_INGREDIENT_ORDER,
  RESET_ORDER_NUMBER,
  TIngredientsActions,
  TConstructorActions,
  TOrderActions
} from '../actions/actions';
import { IngredientsState } from '../../utils/types';
import { getHeading } from '../../utils/getHeading';


export const initialState: IngredientsState = {
  ingredients: [],
  groupTypes: [],
  currentIngredient: null,
  constructorIngredients: [],
  order: null,
  error: null,
  loading: false,
};

export const ingredientsReducer = (
  state = initialState,
  action: TIngredientsActions | TConstructorActions | TOrderActions
): IngredientsState => {
  switch (action.type) {
    case GET_ITEMS_SUCCESS:
      return {
        ...state,
        ingredients: action.payload.map((item) => ({ ...item, counter: 0 })),
        groupTypes: Array.from(new Set(action.payload.map(i => i.type as string)))
          .map(type => ({
            type,
            name: getHeading(type)
          })),
        constructorIngredients: [],
        loading: false,
        error: null,
      };

    case GET_ITEMS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case SET_CURRENT_INGREDIENT:
      return {
        ...state,
        currentIngredient: action.payload,
      };

    case CLEAR_CURRENT_INGREDIENT:
      return {
        ...state,
        currentIngredient: null,
      };

    case ADD_INGREDIENT_TO_CONSTRUCTOR: {
      const newIngredient = action.payload;
      const updatedIngredients = state.ingredients.map(ingredient =>
        ingredient._id === newIngredient._id
          ? { ...ingredient, counter: ingredient.type === 'bun' ? ingredient.counter + 2 : ingredient.counter + 1 }
          : ingredient
      );
      return {
        ...state,
        constructorIngredients: newIngredient.type === 'bun'
          ? [...state.constructorIngredients.filter(i => i.type !== 'bun'),
          { ...newIngredient, position: 'top' },
          { ...newIngredient, position: 'bottom' }]
          : [...state.constructorIngredients, newIngredient],
        ingredients: updatedIngredients,
      };
    }

    case REMOVE_INGREDIENT_FROM_CONSTRUCTOR: {
      const uniqueId = action.payload;
      const removedIngredient = state.constructorIngredients.find(item => item.uniqueId === uniqueId);
      const updatedIngredients = state.ingredients.map(ingredient =>
        ingredient._id === removedIngredient?._id
          ? { ...ingredient, counter: ingredient.counter - 1 }
          : ingredient
      );
      return {
        ...state,
        constructorIngredients: state.constructorIngredients.filter(item => item.uniqueId !== uniqueId),
        ingredients: updatedIngredients,
      };
    }

    case REMOVE_ALL_BUNS_FROM_CONSTRUCTOR: {
      const buns = state.constructorIngredients.filter(item => item.type === 'bun');
      const updatedIngredients = state.ingredients.map(ingredient =>
        buns.some(bun => bun._id === ingredient._id)
          ? { ...ingredient, counter: ingredient.counter - 2 }
          : ingredient
      );
      return {
        ...state,
        constructorIngredients: state.constructorIngredients.filter(item => item.type !== 'bun'),
        ingredients: updatedIngredients,
      };
    }

    case REMOVE_ALL_INGREDIENTS_FROM_CONSTRUCTOR:
      return {
        ...state,
        constructorIngredients: [],
        ingredients: state.ingredients.map(ingredient => ({ ...ingredient, counter: 0 })),
      };

    case RESET_ORDER_NUMBER:
      return {
        ...state,
        order: null, // Обнуляем номер заказа
      };


    case PLACE_ORDER_SUCCESS:
      return {
        ...state,
        order: { number: action.payload.number },
      };

    case PLACE_ORDER_FAILED:
      return {
        ...state,
        error: action.payload
      };

    case UPDATE_INGREDIENT_ORDER: {
      const { dragIndex, hoverIndex } = action.payload;
      const nonBunIngredients = state.constructorIngredients.filter(ingredient => ingredient.type !== 'bun');
      const [draggedItem] = nonBunIngredients.splice(dragIndex, 1);
      nonBunIngredients.splice(hoverIndex, 0, draggedItem);
      return {
        ...state,
        constructorIngredients: [
          ...state.constructorIngredients.filter(ingredient => ingredient.type === 'bun' && ingredient.position === 'top'),
          ...nonBunIngredients,
          ...state.constructorIngredients.filter(ingredient => ingredient.type === 'bun' && ingredient.position === 'bottom')
        ],
      };
    }

    default:
      return state;
  }
};
