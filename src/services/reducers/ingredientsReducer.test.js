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
    RESET_ORDER_NUMBER
} from '../actions/actions';
import { ingredientsReducer } from './ingredientsReducer';

const ingredients = [
    {
        _id: "643d69a5c3f7b9001cfa093c",
        name: "Краторная булка N-200i",
        type: "bun",
        price: 1255,
    },
    {
        _id: "643d69a5c3f7b9001cfa0941",
        name: "Биокотлета из марсианской Магнолии",
        type: "main",
        price: 424,
    },
    {
        _id: "643d69a5c3f7b9001cfa0942",
        name: "Соус Spicy-X",
        type: "sauce",
        price: 90,
    }
];

describe('ingredientsReducer', () => {
    const initialState = {
        ingredients: [],
        groupTypes: [],
        currentIngredient: null,
        constructorIngredients: [],
        order: null,
        error: null,
        loading: false,
    };

    it('should return the initial state when an unknown action is passed', () => {
        const action = { type: 'UNKNOWN_ACTION' };
        const state = ingredientsReducer(undefined, action);
        expect(state).toEqual(initialState);
    });


    it('should handle GET_ITEMS_SUCCESS', () => {
        const action = {
            type: GET_ITEMS_SUCCESS,
            payload: ingredients // передаем данные ингредиентов как payload
        };

        const expectedState = {
            constructorIngredients: [],
            currentIngredient: null,
            error: null,
            groupTypes: [
                { name: "Булки", type: "bun" },
                { name: "Начинки", type: "main" },
                { name: "Соусы", type: "sauce" }
            ],
            ingredients: ingredients.map(item => ({ ...item, counter: 0 })), // ожидаем массив ингредиентов с добавленным counter
            loading: false, // Добавляем недостающее поле loading
            order: null // Добавляем недостающее поле order
        };

        const state = ingredientsReducer(initialState, action);
        expect(state).toEqual(expectedState);
    });

    it('should handle GET_ITEMS_FAILED', () => {
        const action = {
            type: GET_ITEMS_FAILED,
            payload: 'Error fetching ingredients',
        };
        const state = ingredientsReducer(initialState, action);
        expect(state.loading).toBe(false);
        expect(state.error).toBe('Error fetching ingredients');
    });

    it('should handle SET_CURRENT_INGREDIENT', () => {
        const action = {
            type: SET_CURRENT_INGREDIENT,
            payload: ingredients[1],
        };
        const state = ingredientsReducer(initialState, action);
        expect(state.currentIngredient).toEqual(ingredients[1]);
    });

    it('should handle CLEAR_CURRENT_INGREDIENT', () => {
        const prevState = { ...initialState, currentIngredient: ingredients[1] };
        const action = { type: CLEAR_CURRENT_INGREDIENT };
        const state = ingredientsReducer(prevState, action);
        expect(state.currentIngredient).toBe(null);
    });

    it('should handle ADD_INGREDIENT_TO_CONSTRUCTOR', () => {
        const action = {
            type: ADD_INGREDIENT_TO_CONSTRUCTOR,
            payload: ingredients[1],
        };
        const state = ingredientsReducer(initialState, action);
        expect(state.constructorIngredients.length).toBe(1);
        expect(state.constructorIngredients[0].name).toBe('Биокотлета из марсианской Магнолии');
    });

    it('should handle REMOVE_INGREDIENT_FROM_CONSTRUCTOR', () => {
        const ingredient = { ...ingredients[1], uniqueId: 'unique-2' };
        const prevState = { ...initialState, constructorIngredients: [ingredient] };
        const action = {
            type: REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
            payload: 'unique-2',
        };
        const state = ingredientsReducer(prevState, action);
        expect(state.constructorIngredients.length).toBe(0);
    });

    it('should handle REMOVE_ALL_BUNS_FROM_CONSTRUCTOR', () => {
        const bun = { ...ingredients[0], uniqueId: 'unique-1' };
        const prevState = { ...initialState, constructorIngredients: [bun] };
        const action = { type: REMOVE_ALL_BUNS_FROM_CONSTRUCTOR };
        const state = ingredientsReducer(prevState, action);
        expect(state.constructorIngredients.length).toBe(0);
    });

    it('should handle REMOVE_ALL_INGREDIENTS_FROM_CONSTRUCTOR', () => {
        const prevState = {
            ...initialState,
            constructorIngredients: [{ ...ingredients[1], uniqueId: 'unique-2' }],
        };
        const action = { type: REMOVE_ALL_INGREDIENTS_FROM_CONSTRUCTOR };
        const state = ingredientsReducer(prevState, action);
        expect(state.constructorIngredients.length).toBe(0);
    });

    it('should handle PLACE_ORDER_SUCCESS', () => {
        const action = {
            type: PLACE_ORDER_SUCCESS,
            payload: { number: 12345 },
        };
        const state = ingredientsReducer(initialState, action);
        expect(state.order.number).toBe(12345);
    });

    it('should handle PLACE_ORDER_FAILED', () => {
        const action = {
            type: PLACE_ORDER_FAILED,
            payload: 'Error placing order',
        };
        const state = ingredientsReducer(initialState, action);
        expect(state.error).toBe('Error placing order');
    });

    it('should handle RESET_ORDER_NUMBER', () => {
        const prevState = { ...initialState, order: { number: 12345 } };
        const action = { type: RESET_ORDER_NUMBER };
        const state = ingredientsReducer(prevState, action);
        expect(state.order).toBe(null);
    });

    it('should handle UPDATE_INGREDIENT_ORDER', () => {
        const prevState = {
            ...initialState,
            constructorIngredients: [
                { ...ingredients[1], uniqueId: 'unique-2' },
                { ...ingredients[2], uniqueId: 'unique-3' },
            ],
        };
        const action = {
            type: UPDATE_INGREDIENT_ORDER,
            payload: { dragIndex: 0, hoverIndex: 1 },
        };
        const state = ingredientsReducer(prevState, action);
        expect(state.constructorIngredients[0].name).toBe('Соус Spicy-X');
        expect(state.constructorIngredients[1].name).toBe('Биокотлета из марсианской Магнолии');
    });
});
