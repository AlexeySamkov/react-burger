import {
    IUserResponse,
    IErrorResponse,
    IAuthResponse,
    IIngredient,
} from '../../utils/types'
import { ThunkAction } from 'redux-thunk';
// import { Action, ActionCreator } from 'redux';
import store from '../../services/store';


// ITEMS ACTIONS 
export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS';
export const GET_ITEMS_FAILED = 'GET_ITEMS_FAILED';
export const SET_CURRENT_INGREDIENT = 'SET_CURRENT_INGREDIENT'
export const CLEAR_CURRENT_INGREDIENT = 'CLEAR_CURRENT_INGREDIENT';

interface IGetItemsSuccessAction {
  type: typeof GET_ITEMS_SUCCESS;
  payload: IIngredient[];
}

interface IGetItemsFailedAction {
  type: typeof GET_ITEMS_FAILED;
  payload: string;
}

export interface ISetCurrentIngredientAction {
    type: typeof SET_CURRENT_INGREDIENT;
    payload: IIngredient;
  }
  
  export interface IClearCurrentIngredientAction {
    type: typeof CLEAR_CURRENT_INGREDIENT;
  }

export type TIngredientsActions =
  | IGetItemsSuccessAction
  | IGetItemsFailedAction
  | ISetCurrentIngredientAction
  | IClearCurrentIngredientAction
  ;





// INGREDIENTS ACTIONS 
export const ADD_INGREDIENT_TO_CONSTRUCTOR = 'ADD_INGREDIENT_TO_CONSTRUCTOR';
export const REMOVE_INGREDIENT_FROM_CONSTRUCTOR = 'REMOVE_INGREDIENT_FROM_CONSTRUCTOR';
export const REMOVE_ALL_BUNS_FROM_CONSTRUCTOR = 'REMOVE_ALL_BUNS_FROM_CONSTRUCTOR';
export const UPDATE_INGREDIENT_ORDER = 'UPDATE_INGREDIENT_ORDER';
export const REMOVE_ALL_INGREDIENTS_FROM_CONSTRUCTOR = 'REMOVE_ALL_INGREDIENTS_FROM_CONSTRUCTOR';

interface IAddIngredientToConstructorAction {
    type: typeof ADD_INGREDIENT_TO_CONSTRUCTOR;
    payload: IIngredient & { uniqueId: string };
}

interface IRemoveIngredientFromConstructorAction {
    type: typeof REMOVE_INGREDIENT_FROM_CONSTRUCTOR;
    payload: string;
}

interface IRemoveAllBunsFromConstructorAction {
    type: typeof REMOVE_ALL_BUNS_FROM_CONSTRUCTOR;
}

interface IRemoveAllIngredientsFromConstructorAction {
    type: typeof REMOVE_ALL_INGREDIENTS_FROM_CONSTRUCTOR;
}


interface IUpdateIngredientOrderAction {
    type: typeof UPDATE_INGREDIENT_ORDER;
    payload: {
        dragIndex: number;
        hoverIndex: number;
    };
}

export type TConstructorActions =
    | IAddIngredientToConstructorAction
    | IRemoveIngredientFromConstructorAction
    | IRemoveAllBunsFromConstructorAction
    | IUpdateIngredientOrderAction
    | IRemoveAllIngredientsFromConstructorAction;

// ORDER ACTIONS 
export const PLACE_ORDER_SUCCESS = 'PLACE_ORDER_SUCCESS';
export const PLACE_ORDER_FAILED = 'PLACE_ORDER_FAILED';

interface IPlaceOrderSuccessAction {
    type: typeof PLACE_ORDER_SUCCESS;
    payload: { order: number };
}

interface IPlaceOrderFailedAction {
    type: typeof PLACE_ORDER_FAILED;
    payload: string;
}

export type TOrderActions =
    | IPlaceOrderSuccessAction
    | IPlaceOrderFailedAction;

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

// USER ACTIONS     
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';

interface IRegisterSuccessAction {
    type: typeof REGISTER_SUCCESS;
    payload: IAuthResponse;
}

interface IRegisterFailedAction {
    type: typeof REGISTER_FAILED;
    error: string;
}

interface ILoginSuccessAction {
    type: typeof LOGIN_SUCCESS;
    payload: IAuthResponse;
}

interface ILoginFailedAction {
    type: typeof LOGIN_FAILED;
    error: string;
}

interface ILogoutSuccessAction {
    type: typeof LOGOUT_SUCCESS;
}

interface ILogoutFailedAction {
    type: typeof LOGOUT_FAILED;
    error: string;
}

export type TAuthActions =
    | IRegisterSuccessAction
    | IRegisterFailedAction
    | ILoginSuccessAction
    | ILoginFailedAction
    | ILogoutSuccessAction
    | ILogoutFailedAction;


// Объединяем все типы в одну кучку    
export type TAppActions =
    | TIngredientsActions
    | TConstructorActions
    | TOrderActions
    | TUserActions
    | TPasswordActions
    | TAuthActions;    

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    TAppActions
  >;    

