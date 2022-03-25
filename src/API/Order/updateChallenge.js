import axios from "axios";
import { update, setUpdating, setUpdated, throwError } from '../../Pages/Challenge/Redux/challengeSlice';
import { authFormDataHeader, handleErrorResponse } from '../../helper';

const { REACT_APP_API_URL } = process.env;

export const updateChallenge = (data) => async dispatch => {
  dispatch(setUpdating(true));

  try {
    const formDataParams = new FormData();

    formDataParams.append('title', data.title);
    formDataParams.append('description', data.description);
    formDataParams.append('active', data.active);

    if (typeof data.thumbnail !== 'undefined') {
      formDataParams.append('thumbnail', data.thumbnail);
    }
    if (typeof data.image !== 'undefined') {
      formDataParams.append('image', data.image);
    }
    if (typeof data.video !== 'undefined') {
      formDataParams.append('video', data.video);
    }

    const resp = await axios.put(`${REACT_APP_API_URL}/v1/challenge/${data._id}`, formDataParams, authFormDataHeader());

    if (resp.status === 200) {
      dispatch(update(resp.data));
      dispatch(setUpdated(true));
    }

  } catch (error) {
    dispatch(throwError(handleErrorResponse(error)));
  }

  dispatch(setUpdating(false));
};