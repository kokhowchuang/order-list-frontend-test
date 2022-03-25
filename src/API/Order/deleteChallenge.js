import axios from "axios";
import { remove, setUpdating, setUpdated, throwError } from '../../Pages/Challenge/Redux/challengeSlice';
import { authHeader, handleErrorResponse } from '../../helper';

const { REACT_APP_API_URL } = process.env;

export const deleteChallenge = (data) => async dispatch => {
  dispatch(setUpdating(true));

  try {
    const resp = await Promise.all(data.ids.map(async musicId => {
      const resp = await axios.delete(`${REACT_APP_API_URL}/v1/challenge/${musicId}`, authHeader());

      return resp;
    }));

    dispatch(remove(data.ids));
    dispatch(setUpdated(true));

  } catch (error) {
    dispatch(throwError(handleErrorResponse(error)));
  }

  dispatch(setUpdating(true));
};
