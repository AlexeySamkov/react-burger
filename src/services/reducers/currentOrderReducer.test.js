import {
    SET_CURRENT_ORDER,
    CLEAR_CURRENT_ORDER,
    FETCH_CURRENT_ORDER_REQUEST,
    FETCH_CURRENT_ORDER_SUCCESS,
    FETCH_CURRENT_ORDER_FAILED
} from '../actions/actions';
import { currentOrderReducer, initialState } from './currentOrderReducer';

describe('currentOrderReducer', () => {

    //Тестирование начального состояния: Первый тест проверяет, что редьюсер возвращает начальное состояние,
    // когда ему передается неизвестный тип действия.
    it('should return the initial state when an unknown action is passed', () => {
        const action = { type: 'UNKNOWN_ACTION' };
        const state = currentOrderReducer(undefined, action);
        expect(state).toEqual(initialState);
    });
    
    // Тест для SET_CURRENT_ORDER: Проверяется, что редьюсер корректно устанавливает текущее значение заказа.
    it('should handle SET_CURRENT_ORDER', () => {
        const action = {
            type: SET_CURRENT_ORDER,
            payload: 12345
        };
        const expectedState = {
            ...initialState,
            currentOrder: 12345
        };
        const state = currentOrderReducer(initialState, action);
        expect(state).toEqual(expectedState);
    });

    // Тест для CLEAR_CURRENT_ORDER: Проверяется, что состояние сбрасывается, если вызывается действие очистки текущего заказа.
    it('should handle CLEAR_CURRENT_ORDER', () => {
        const action = {
            type: CLEAR_CURRENT_ORDER
        };
        const prevState = {
            currentOrder: 12345,
            orderDetails: { id: 1, items: [] },
            loading: false,
            error: null
        };
        const expectedState = {
            ...initialState
        };
        const state = currentOrderReducer(prevState, action);
        expect(state).toEqual(expectedState);
    });
    
    // Тест для FETCH_CURRENT_ORDER_REQUEST: Проверяется, что редьюсер устанавливает флаг loading при запросе данных
    it('should handle FETCH_CURRENT_ORDER_REQUEST', () => {
        const action = {
            type: FETCH_CURRENT_ORDER_REQUEST
        };
        const expectedState = {
            ...initialState,
            loading: true,
            error: null
        };
        const state = currentOrderReducer(initialState, action);
        expect(state).toEqual(expectedState);
    });

    // Тест для FETCH_CURRENT_ORDER_SUCCESS: Проверяется, что при успешном получении данных о заказе они сохраняются в orderDetails, 
    // а loading сбрасывается.
    it('should handle FETCH_CURRENT_ORDER_SUCCESS', () => {
        const orderDetails = { id: 12345, items: [{ name: 'Супер галактик космик бургер', price: 10 }] };  // Пример данных о заказе
        const action = {
            type: FETCH_CURRENT_ORDER_SUCCESS,
            payload: orderDetails
        };
        const expectedState = {
            ...initialState,
            loading: false,
            orderDetails: orderDetails
        };
        const state = currentOrderReducer(initialState, action);
        expect(state).toEqual(expectedState);
    });

    // Тест для FETCH_CURRENT_ORDER_FAILED: Проверяется, что при ошибке получения заказа состояние обновляется с установкой ошибки.
    it('should handle FETCH_CURRENT_ORDER_FAILED', () => {
        const errorMessage = 'Failed to fetch order';
        const action = {
            type: FETCH_CURRENT_ORDER_FAILED,
            payload: errorMessage
        };
        const expectedState = {
            ...initialState,
            loading: false,
            error: errorMessage
        };
        const state = currentOrderReducer(initialState, action);
        expect(state).toEqual(expectedState);
    });
});
