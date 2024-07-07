import { checkResponse } from './checkResponse';
import { baseAPI } from './const';

export async function request(endpoint, options) {
    const res = await fetch(`${baseAPI}${endpoint}`, options);
    return checkResponse(res);
}