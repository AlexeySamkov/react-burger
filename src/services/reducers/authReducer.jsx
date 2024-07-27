import {
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  GET_USER_SUCCESS,
  GET_USER_FAILED
} from '../actions/actions';

const initialState = {
  user: null,
  isAuthenticated: false,
  error: null
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
    case GET_USER_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        error: null
      };
    case REGISTER_FAILED:
    case LOGIN_FAILED:
    case GET_USER_FAILED:
      return {
        ...state,
        error: action.payload
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
        error: action.payload
      };
    default:
      return state;
  }
};
