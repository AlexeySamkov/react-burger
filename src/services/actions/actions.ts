import {
    IUserResponse,
    IErrorResponse,
    // IAuthResponse,
    IIngredient,
    TResponseData,
    IOrder
} from '../../utils/types'
import { ThunkAction } from 'redux-thunk';
import  store  from '../../services/store';
// import { rootReducer } from '../reducers/rootReducer';


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
export const RESET_ORDER_NUMBER = 'RESET_ORDER_NUMBER'

interface IPlaceOrderSuccessAction {
    type: typeof PLACE_ORDER_SUCCESS;
    payload: IOrder;
}

interface IPlaceOrderFailedAction {
    type: typeof PLACE_ORDER_FAILED;
    payload: string;
}

interface IResetOrderNumber {
    type: typeof RESET_ORDER_NUMBER;
    payload: string;
}

export type TOrderActions =
    | IPlaceOrderSuccessAction
    | IPlaceOrderFailedAction
    | IResetOrderNumber;

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
    payload: string;
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
    payload: string
}

interface IRegisterFailedAction {
    type: typeof REGISTER_FAILED;
    payload: string
}

interface ILoginSuccessAction {
    type: typeof LOGIN_SUCCESS;
    payload: string;
}

interface ILoginFailedAction {
    type: typeof LOGIN_FAILED;
    payload: {
        error: string;
    };
}

interface ILogoutSuccessAction {
    type: typeof LOGOUT_SUCCESS;
}

interface ILogoutFailedAction {
    type: typeof LOGOUT_FAILED;
    payload: string;
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
// export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;    

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    TAppActions
  >;    

// WEBSOCKET ACTIONS 
export const WS_CONNECT = 'WS_CONNECT';
export const WS_DISCONNECT = 'WS_DISCONNECT';
export const WS_CONNECT_SUCCESS = 'WS_CONNECT_SUCCESS';
export const WS_CONNECT_ERROR = 'WS_CONNECT_ERROR';
export const WS_RECEIVE_ORDERS = 'WS_RECEIVE_ORDERS';
export const WS_GET_MESSAGE = 'WS_GET_MESSAGE';

export type TWsActions = {
    wsInit: typeof WS_CONNECT,
    onOpen: typeof WS_CONNECT_SUCCESS,
    onClose: typeof WS_DISCONNECT,
    onError: typeof WS_CONNECT_ERROR,
    onMessage: typeof WS_GET_MESSAGE,
  }

  
  export interface IWsConnectAction {
    type: typeof WS_CONNECT;
    payload: any 
}



export interface IWsDisconnectAction {
    type: typeof WS_DISCONNECT;
    payload?: any;
}

export interface IWsConnectSuccessAction {
    type: typeof WS_CONNECT_SUCCESS;
    payload?: any;
}

export interface IWsConnectErrorAction {
    type: typeof WS_CONNECT_ERROR;
    payload?: any;
}

export interface IWsReceiveOrdersAction {
    type: typeof WS_RECEIVE_ORDERS;
    payload: any;  // пока any 
}

export interface IWSGetMessageAction {
    type: typeof WS_GET_MESSAGE;
    responseData: TResponseData;
    payload?: any;
  }

export type TWSTypes =
    | IWsConnectAction
    | IWsDisconnectAction
    | IWsConnectSuccessAction
    | IWsConnectErrorAction
    | IWsReceiveOrdersAction
    | IWSGetMessageAction;

// CurreentOrder 
export const SET_CURRENT_ORDER = 'SET_CURRENT_ORDER';
export const CLEAR_CURRENT_ORDER = 'CLEAR_CURRENT_ORDER';
export const FETCH_CURRENT_ORDER_SUCCESS = 'FETCH_CURRENT_ORDER_SUCCESS'
export const FETCH_CURRENT_ORDER_FAILED = 'FETCH_CURRENT_ORDER_FAILED'
export const FETCH_CURRENT_ORDER_REQUEST = 'FETCH_CURRENT_ORDER_REQUEST'
