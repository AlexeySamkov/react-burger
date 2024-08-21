import {
    IUserResponse,
    IErrorResponse,
    IIngredientsResponse

} from '../../utils/types'

export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS'
export const GET_ITEMS_FAILED = 'GET_ITEMS_FAILED'
export const SET_TYPE_HEADINGS = 'SET_TYPE_HEADINGS';

export const SET_CURRENT_INGREDIENT = 'SET_CURRENT_INGREDIENT'
export const CLEAR_CURRENT_INGREDIENT = 'CLEAR_CURRENT_INGREDIENT';

export const ADD_INGREDIENT_TO_CONSTRUCTOR = 'ADD_INGREDIENT_TO_CONSTRUCTOR';
export const REMOVE_INGREDIENT_FROM_CONSTRUCTOR = 'REMOVE_INGREDIENT_FROM_CONSTRUCTOR';
export const REMOVE_ALL_BUNS_FROM_CONSTRUCTOR = 'REMOVE_ALL_BUNS_FROM_CONSTRUCTOR';
export const UPDATE_INGREDIENT_ORDER = 'UPDATE_INGREDIENT_ORDER';
export const REMOVE_ALL_INGREDIENTS_FROM_CONSTRUCTOR = 'REMOVE_ALL_INGREDIENTS_FROM_CONSTRUCTOR';

// ORDER ACTIONS 
export const PLACE_ORDER_SUCCESS = 'PLACE_ORDER_SUCCESS';
export const PLACE_ORDER_FAILED = 'PLACE_ORDER_FAILED';

interface IPlaceOrderSuccessAction {
    type: typeof PLACE_ORDER_SUCCESS;
    payload: { order: number };
}

interface IPlaceOrderFailedAction {
    type: typeof PLACE_ORDER_FAILED;
    error: string;
}

interface RemoveAllIngredientsFromConstructorAction {
    type: typeof REMOVE_ALL_INGREDIENTS_FROM_CONSTRUCTOR;
}

export type TOrderActions =
    | IPlaceOrderSuccessAction
    | IPlaceOrderFailedAction
    | RemoveAllIngredientsFromConstructorAction;

// USER ACTIONS 
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILED = 'GET_USER_FAILED';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILED = 'UPDATE_USER_FAILED';
export const UPDATE_USER_ERROR = 'UPDATE_USER_ERROR';

interface IGetUserSuccessAction {
    type: typeof GET_USER_SUCCESS;
    payload: IUserResponse;
}

interface IGetUserFailedAction {
    type: typeof GET_USER_FAILED;
    payload: IErrorResponse;
}

interface IUpdateUserSuccessAction {
    type: typeof UPDATE_USER_SUCCESS;
    payload: IUserResponse;
}

interface IUpdateUserFailedAction {
    type: typeof UPDATE_USER_FAILED;
    payload: IErrorResponse;
}

export type TUserActions =
    | IGetUserSuccessAction
    | IGetUserFailedAction
    | IUpdateUserSuccessAction
    | IUpdateUserFailedAction;

// PASSWORD ACTIONS
export const PASSWORD_RESET_SUCCESS = 'PASSWORD_RESET_SUCCESS';
export const PASSWORD_RESET_FAILED = 'PASSWORD_RESET_FAILED';
export const PASSWORD_RESET_CONFIRM_SUCCESS = 'PASSWORD_RESET_CONFIRM_SUCCESS';
export const PASSWORD_RESET_CONFIRM_FAILED = 'PASSWORD_RESET_CONFIRM_FAILED';


interface IPasswordResetSuccessAction {
    type: typeof PASSWORD_RESET_SUCCESS;
    message: string;
}

interface IPasswordResetFailedAction {
    type: typeof PASSWORD_RESET_FAILED;
    error: string;
}

interface IPasswordResetConfirmSuccessAction {
    type: typeof PASSWORD_RESET_CONFIRM_SUCCESS;
    message: string;
}

interface IPasswordResetConfirmFailedAction {
    type: typeof PASSWORD_RESET_CONFIRM_FAILED;
    error: string;
}

export type TPasswordActions =
    | IPasswordResetSuccessAction
    | IPasswordResetFailedAction
    | IPasswordResetConfirmSuccessAction
    | IPasswordResetConfirmFailedAction;

export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';
