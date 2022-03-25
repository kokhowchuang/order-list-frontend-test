import axios from "axios";
import { handleErrorResponse } from "../../helper";

const { REACT_APP_API_URL } = process.env;

export const fetchFilter = () => {
  return async function (dispatch) {
    try {
      let link = `${REACT_APP_API_URL}/filters/`;

      const res = await axios.get(link);
      return res.data;
    } catch (error) {
      dispatch(handleErrorResponse(error));
    }
  };
};
