import {
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  TAuthActions,
  TUserActions
} from '../actions/actions';
import { IUser } from '../../utils/types';


const initialState: IAuthState = {
  user: null,
  isAuthenticated: false,
  error: null
};

interface IAuthState {
  user: IUser | null;
  isAuthenticated: boolean;
  error: string | null;
}

export const authReducer = (state = initialState, action: TAuthActions | TUserActions): IAuthState => {
  switch (action.type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        error: null
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        error: null
      };
    case REGISTER_FAILED:
    case LOGIN_FAILED:
      return {
        ...state,
        isAuthenticated: false,
        error: typeof action.payload === 'string' ? action.payload : action.payload.error
      }
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
