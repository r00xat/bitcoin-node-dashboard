import Cookies from 'js-cookie';

const tokenKey = 'token';

export function getToken() {
   return Cookies.get(tokenKey);
}

export function setToken(token: string, rememberMe: boolean) {
   Cookies.set(tokenKey, token, {
      expires: rememberMe ? 1 : undefined,
      path: '/',
      secure: false,
   });
}

export function removeToken() {
   Cookies.remove(tokenKey);
}