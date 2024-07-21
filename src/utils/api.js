import { baseAPI } from './const';

// Функция для проверки ответа
export const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

// Функция для обновления токена
export const refreshToken = async () => {
  const res = await fetch(`${baseAPI}/auth/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            token: localStorage.getItem("refreshToken"),
        }),
    }); 
    const refreshData = await checkResponse(res);
    
    if (!refreshData.success) {
        return Promise.reject(refreshData);
    }
    localStorage.setItem("refreshToken", refreshData.refreshToken);
    localStorage.setItem("accessToken", refreshData.accessToken);
    return refreshData;
};

// Функция-обертка для fetch с обновлением токена при необходимости
export const fetchWithRefresh = async (url, options) => {
  try {
    url = `${baseAPI}${url}`
    
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken(); // обновляем токен
      options.headers.authorization = `Bearer ${refreshData.accessToken}`;
      // options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options); // повторяем запрос
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};
