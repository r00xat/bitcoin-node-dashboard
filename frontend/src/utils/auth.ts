import Cookies from 'js-cookie';

const tokenKey = 'token';
const tokenSettings = {
   expires: new Date(new Date().getTime() + 21600000), // 6 hours
   path: '/',
   secure: false,
};

export function getToken() {
   return Cookies.get(tokenKey);
}

export function setToken(token: string) {
   Cookies.set(tokenKey, token, tokenSettings);
}

export function removeToken() {
   Cookies.remove(tokenKey);
}