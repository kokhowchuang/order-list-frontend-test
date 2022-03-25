import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);

    return userToken?.accessToken;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = userToken => {
    localStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken.accessToken);
  };

  const removeToken = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  }

  return {
    setToken: saveToken,
    unsetToken: removeToken,
    token
  }
}

export const invalidateToken = () => {
  localStorage.removeItem('token');
  window.location.href = '/';
}
