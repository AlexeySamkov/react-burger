import { request } from '../../utils/request';
import {
  REGISTER_SUCCESS
  , REGISTER_FAILED
  , LOGIN_SUCCESS
  , LOGIN_FAILED
  , LOGOUT_SUCCESS
  , LOGOUT_FAILED
  , TAuthActions
} from './actions'
import { Dispatch } from 'redux';


/**
 * Формат тела запроса регистрации:
 * {
  "email": "", 
  "password": "", 
  "name": "" 
}
 */
export const register = (email: string, password: string, name: string) => {
  return async (dispatch: Dispatch<TAuthActions>) => {
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
    } catch (error: any) {
      dispatch({
        type: REGISTER_FAILED,
        payload: `Произошла ошибка: ${error.message}`
      });
    }
  };
};

export const login = (email: string, password: string) => {
  return async (dispatch: Dispatch<TAuthActions>) => {
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
    } catch (error: any) {

      let errorMessage = 'Неизвестная ошибка';
      if (error.response && error.response.data && error.response.data.message) { // Обработка ошибок, возвращенных сервером         
        errorMessage = error.response.data.message;
      } else if (error.message) {   // Обработка стандартных ошибок JavaScript     
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }

      console.log('Login failed:', errorMessage);
      alert('Login failed:' + errorMessage)
      dispatch({
        type: LOGIN_FAILED,
        payload: {
          error: `Произошла ошибка: ${errorMessage}`
        }
      });
    }
  };
};

export const logout = () => {
  return async (dispatch: Dispatch<TAuthActions>) => {
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
    } catch (error: any) {
      console.log('Logout failed:', error.message);
      dispatch({
        type: LOGOUT_FAILED,
        payload: `Произошла ошибка: ${error.message}`
      });
    }
  };
};
