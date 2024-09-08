import { authReducer, initialState } from './authReducer';
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

// Мокаем IUser для тестирования
const mockUser = {
  id: '1',
  name: 'Andrew Gordienko',
  email: 'andrew@yandex.ru'
};

describe('authReducer', () => {

  it('should return the initial state when an unknown action is passed', () => {
    const action = { type: 'UNKNOWN_ACTION' }
    const state = authReducer(undefined, action);
    expect(state).toEqual(initialState);
  });

  it('should handle REGISTER_SUCCESS and LOGIN_SUCCESS', () => {
    const action = {
      type: REGISTER_SUCCESS
    };
    const expectedState = {
      ...initialState,
      isAuthenticated: true,
      error: null
    };
    const state = authReducer(initialState, action);
    expect(state).toEqual(expectedState);

    const loginAction = {
      type: LOGIN_SUCCESS
    };
    const loginState = authReducer(initialState, loginAction);
    expect(loginState).toEqual(expectedState);
  });

  it('should handle GET_USER_SUCCESS', () => {
    const action = {
      type: GET_USER_SUCCESS,
      payload: {
        user: mockUser
      }
    };
    const expectedState = {
      ...initialState,
      user: mockUser,
      isAuthenticated: true,
      error: null
    };
    const state = authReducer(initialState, action);
    expect(state).toEqual(expectedState);
  });

  it('should handle REGISTER_FAILED and LOGIN_FAILED', () => {
    const errorMessage = 'Registration failed';
    const action = {
      type: REGISTER_FAILED,
      payload: errorMessage
    };
    const expectedState = {
      ...initialState,
      isAuthenticated: false,
      error: errorMessage
    };
    const state = authReducer(initialState, action);
    expect(state).toEqual(expectedState);

    const loginErrorAction = {
      type: LOGIN_FAILED,
      payload: errorMessage
    };
    const loginState = authReducer(initialState, loginErrorAction);
    expect(loginState).toEqual(expectedState);
  });

  it('should handle GET_USER_FAILED', () => {
    const errorMessage = 'Failed to fetch user data';
    const action = {
      type: GET_USER_FAILED,
      payload: errorMessage
    };
    const expectedState = {
      ...initialState,
      error: errorMessage
    };
    const state = authReducer(initialState, action);
    expect(state).toEqual(expectedState);
  });

  it('should handle LOGOUT_SUCCESS', () => {
    const action = {
      type: LOGOUT_SUCCESS
    };
    const expectedState = {
      ...initialState,
      user: null,
      isAuthenticated: false,
      error: null
    };
    const state = authReducer(
      {
        ...initialState,
        user: mockUser,
        isAuthenticated: true
      },
      action
    );
    expect(state).toEqual(expectedState);
  });

  it('should handle LOGOUT_FAILED', () => {
    const errorMessage = 'Logout failed';
    const action = {
      type: LOGOUT_FAILED,
      payload: errorMessage
    };
    const expectedState = {
      ...initialState,
      error: errorMessage
    };
    const state = authReducer(initialState, action);
    expect(state).toEqual(expectedState);
  });
});
