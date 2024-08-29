import {
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_FAILED,
    PASSWORD_RESET_CONFIRM_SUCCESS,
    PASSWORD_RESET_CONFIRM_FAILED,
    TPasswordActions
  } from '../actions/actions';
  
  const initialState = {
    message: null,
    error: null
  };
  
  export const passwordReducer = (state = initialState, action: TPasswordActions) => {
    switch (action.type) {
      case PASSWORD_RESET_SUCCESS:
        return {
          ...state,
          message: action.message,
          error: null
        };
      case PASSWORD_RESET_FAILED:
        return {
          ...state,
          error: action.error
        };
      case PASSWORD_RESET_CONFIRM_SUCCESS:
        return {
          ...state,
          message: action.message,
          error: null
        };
      case PASSWORD_RESET_CONFIRM_FAILED:
        return {
          ...state,
          error: action.error
        };
      default:
        return state;
    }
  };
  