import { request } from '../../utils/request';
import {
  PASSWORD_RESET_SUCCESS
  , PASSWORD_RESET_FAILED
  , PASSWORD_RESET_CONFIRM_SUCCESS
  , PASSWORD_RESET_CONFIRM_FAILED
  , TPasswordActions
} from './actions'
import { Dispatch } from 'redux';

export const resetPassword = (email: string) => {
  return async (dispatch: Dispatch<TPasswordActions>) => {
    try {
      const res = await request('/password-reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });
      dispatch({
        type: PASSWORD_RESET_SUCCESS,
        message: res.message
      });
    } catch (error: any) {
      dispatch({
        type: PASSWORD_RESET_FAILED,
        error: `Произошла ошибка: ${error.message}`
      });
    }
  };
};

export const resetPasswordConfirm = (password: string, token: string) => {
  return async (dispatch: Dispatch<TPasswordActions>) => {
    try {
      const res = await request('/password-reset/reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password, token })
      });
      dispatch({
        type: PASSWORD_RESET_CONFIRM_SUCCESS,
        message: res.message
      });
    } catch (error: any) {
      dispatch({
        type: PASSWORD_RESET_CONFIRM_FAILED,
        error: `Произошла ошибка: ${error.message}`
      });
    }
  };
};
