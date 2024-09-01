import { baseAPI } from './const';

interface ApiResponse {
  success: boolean;
  refreshToken?: string;
  accessToken?: string;
  [key: string]: any; // позволяет поддерживать любые другие поля
}

// Функция для проверки ответа
export const checkResponse = (res: Response): Promise<ApiResponse> => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

// Функция для обновления токена
export const refreshToken = async (): Promise<ApiResponse> => {
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
  localStorage.setItem("refreshToken", refreshData.refreshToken!);
  localStorage.setItem("accessToken", refreshData.accessToken!.split('Bearer ')[1]);

  return refreshData;
};

// Функция-обертка для fetch с обновлением токена при необходимости
export const fetchWithRefresh = async (url: string, options: RequestInit): Promise<ApiResponse> => {
  try {
    const res = await fetch(`${baseAPI}${url}`, options);
    return await checkResponse(res);
  } catch (err: any) {
    if (err.message === "jwt expired" || err.message === "Token is invalid or expired") {
      const refreshData = await refreshToken(); // обновляем токен
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${refreshData.accessToken}`
      };
      const res = await fetch(`${baseAPI}${url}`, options); // повторяем запрос
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};
