import axios from "axios";
import { get, throwError } from '../../Pages/Challenge/Redux/challengeSlice';

const { REACT_APP_API_URL } = process.env;

export const fetchSingleChallenge = (challengeId) => async dispatch => {
  try {
    const res = await axios.get(`${REACT_APP_API_URL}/v1/challenge/` + challengeId, {});
    dispatch(get(res.data));

  } catch (error) {
    dispatch(throwError(error.message));
  }
};