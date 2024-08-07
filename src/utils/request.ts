import { baseAPI } from './const';

// параметр options является необязательным и должен соответствовать интерфейсу RequestInit
// Promise<any>: Указывает, что функция возвращает Promise, который может разрешиться в любое значение (any). т.к. 
// идет обращение к различным эндпойнтам, то я заранее не знаю какую структуру я ожидаю, та то наверное можно ее тут задать
export async function request(endpoint: string, options?: RequestInit): Promise<any> {
    const res = await fetch(`${baseAPI}${endpoint}`, options);
    return checkResponse(res);
}


export function checkResponse(res: Response): Promise<any> {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
}