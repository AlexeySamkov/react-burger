import { request } from '../../utils/request';
import {
  REGISTER_SUCCESS
  , REGISTER_FAILED
  , LOGIN_SUCCESS
  , LOGIN_FAILED
  , LOGOUT_SUCCESS
  , LOGOUT_FAILED
} from './actions'

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
      console.log('Успешно вошли:', res.user.name);
      console.log('Email:', res.user.email);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.user
      });
    } catch (error) {
      console.log('Login failed:', error.message);
      alert('Login failed:', error.message)
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
      console.log('Успешно вышли');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      dispatch({
        type: LOGOUT_SUCCESS
      });
    } catch (error) {
      console.log('Logout failed:', error.message);
      dispatch({
        type: LOGOUT_FAILED,
        error: `Произошла ошибка: ${error.message}`
      });
    }
  };
};
