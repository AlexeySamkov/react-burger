import { request } from '../../utils/request';
export const PASSWORD_RESET_SUCCESS = 'PASSWORD_RESET_SUCCESS';
export const PASSWORD_RESET_FAILED = 'PASSWORD_RESET_FAILED';
export const PASSWORD_RESET_CONFIRM_SUCCESS = 'PASSWORD_RESET_CONFIRM_SUCCESS';
export const PASSWORD_RESET_CONFIRM_FAILED = 'PASSWORD_RESET_CONFIRM_FAILED';

export const resetPassword = (email) => {
  return async (dispatch) => {
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
    } catch (error) {
      dispatch({
        type: PASSWORD_RESET_FAILED,
        error: `Произошла ошибка: ${error.message}`
      });
    }
  };
};

export const resetPasswordConfirm = (password, token) => {
  return async (dispatch) => {
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
    } catch (error) {
      dispatch({
        type: PASSWORD_RESET_CONFIRM_FAILED,
        error: `Произошла ошибка: ${error.message}`
      });
    }
  };
};
