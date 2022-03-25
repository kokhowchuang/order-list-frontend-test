import { useState } from 'react';
import { useDispatch } from "react-redux";
import { invalidateToken } from './useToken';

export const authHeader = () => {
  const tokenString = localStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  const token = userToken?.accessToken;

  return { headers: { "content-type": "application/json", 'Authorization': `Basic ${token}` } };
}

export const authFormDataHeader = () => {
  const tokenString = localStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  const token = userToken?.accessToken;

  return { headers: { "content-type": "multipart/form-data", 'Authorization': `Basic ${token}` } };
}

export const handleErrorResponse = (error) => {
  if (error) {
    if (error.response) {
      if (parseInt(error.response.status) === 401 || parseInt(error.response.status) === 403) {
        invalidateToken();
      }
    }

    return error.message;
  }
}