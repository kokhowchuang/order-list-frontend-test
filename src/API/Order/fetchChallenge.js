import axios from "axios";
import { fetch, throwError } from '../../Pages/Challenge/Redux/challengeSlice';

const { REACT_APP_API_URL } = process.env;

export const fetchChallenge = (offset) => {
  return async function (dispatch) {
    try {
      let link = `${REACT_APP_API_URL}/v1/challenge/`;

      if (offset !== '') {
        link += '?offset=' + offset;
      }
      const res = await axios.get(link, {});
      dispatch(fetch({ data: res.data, offset: (offset !== '') ? offset : 1 }));

    } catch (error) {
      dispatch(throwError(error.message));
    }
  }
};