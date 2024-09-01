import {
    GET_USER_SUCCESS,
    GET_USER_FAILED,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAILED, 
    TUserActions
  } from '../actions/actions';
  
  const initialState = {
    error: null
  };
  
  export const userReducer = (state = initialState, action: TUserActions) => {
    switch (action.type) {
      case GET_USER_SUCCESS:
        return {
          ...state,
          error: null
        };
      case GET_USER_FAILED:
        return {
          ...state,
          error: action.payload
        };
      case UPDATE_USER_SUCCESS:
        return {
          ...state,
          error: null
        };
      case UPDATE_USER_FAILED:
        return {
          ...state,
          error: action.payload
        };
      default:
        return state;
    }
  };
  