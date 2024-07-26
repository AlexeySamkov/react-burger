import { fetchWithRefresh } from '../../utils/api';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILED = 'GET_USER_FAILED';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILED = 'UPDATE_USER_FAILED';


export const getUser = () => {
  return async (dispatch) => {
    try {
      //console.log("accessToken="+ localStorage.getItem('accessToken'));
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      };
      const response = await fetchWithRefresh('/auth/user', options);
      console.log('Успешно получен пользователь', response.user.name);
      console.log('c Email', response.user.email);
      dispatch({ type: 'GET_USER_SUCCESS', payload: response });
    } catch (error) {
      console.log('Ошибка получения пользователя', error.message);
      dispatch({ type: 'GET_USER_ERROR', payload: error });
    }
  };
};

export const updateUser = (userData) => {
  return async (dispatch) => {
    try {
      const options = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify(userData),
      };
      const response = await fetchWithRefresh('/auth/user', options);
      console.log('Успешно обновлен пользователь', response.user.name);
      dispatch({ type: 'UPDATE_USER_SUCCESS', payload: response });
    } catch (error) {
      console.log('Ошибка при обновлении пользователя', error.message);
      dispatch({ type: 'UPDATE_USER_ERROR', payload: error });
    }
  };
};
