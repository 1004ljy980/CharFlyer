import LocalStorage from './LocalStorage';

function setAccessToken(token: string) {
  LocalStorage.setItem('accessToken', token);
}

function getAccessToken() {
  return LocalStorage.getItem('accessToken') || undefined;
}

export { setAccessToken, getAccessToken };
