import { request } from '../../utils/request';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';

/**
 * Формат тела запроса регистрации:
 * {
  "email": "", 
  "password": "", 
  "name": "" 
}
 */
export const register = (email, password, name) => {
  return async (dispatch) => {
    try {
      const res = await request('/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, name })
      });
      localStorage.setItem('accessToken', res.accessToken.split('Bearer ')[1]);
      localStorage.setItem('refreshToken', res.refreshToken);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.user
      });
    } catch (error) {
      dispatch({
        type: REGISTER_FAILED,
        error: `Произошла ошибка: ${error.message}`
      });
    }
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      const res = await request('/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      localStorage.setItem('accessToken', res.accessToken.split('Bearer ')[1]);
      localStorage.setItem('refreshToken', res.refreshToken);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.user
      });
    } catch (error) {
      dispatch({
        type: LOGIN_FAILED,
        error: `Произошла ошибка: ${error.message}`
      });
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      await request('/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: refreshToken })
      });
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      dispatch({
        type: LOGOUT_SUCCESS
      });
    } catch (error) {
      dispatch({
        type: LOGOUT_FAILED,
        error: `Произошла ошибка: ${error.message}`
      });
    }
  };
};
