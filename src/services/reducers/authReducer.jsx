import {
    REGISTER_SUCCESS,
    REGISTER_FAILED,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGOUT_SUCCESS,
    LOGOUT_FAILED

  } from '../actions/authActions';
  
  const initialState = {
    user: null,
    isAuthenticated: false,
    error: null
  };
  
  export const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case REGISTER_SUCCESS:
        return {
          ...state,
          user: action.payload,
          isAuthenticated: true,
          error: null
        };
      case REGISTER_FAILED:
        return {
          ...state,
          error: action.error
        };
      case LOGIN_SUCCESS:
        return {
          ...state,
          user: action.payload,
          isAuthenticated: true,
          error: null
        };
      case LOGIN_FAILED:
        return {
          ...state,
          error: action.error
        };
        case LOGOUT_SUCCESS:
            return {
              ...state,
              user: null,
              isAuthenticated: false,
              error: null
            };
          case LOGOUT_FAILED:
            return {
              ...state,
              error: action.error
            };
      default:
        return state;
    }
  };
  