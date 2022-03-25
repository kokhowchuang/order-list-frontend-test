import axios from "axios";
import { handleErrorResponse } from "../../helper";

const { REACT_APP_API_URL } = process.env;

export const fetchOrder = (data) => async (dispatch) => {
  try {
    const params = [];
    let link = `${REACT_APP_API_URL}/orders`;

    if (typeof data.year !== "undefined") {
      params.push("year=" + data.year);
    }
    if (typeof data.country !== "undefined") {
      params.push("country=" + data.country);
    }
    if (typeof data.manager !== "undefined") {
      params.push("manager=" + data.manager);
    }

    link += params.length > 0 ? "?" + params.join("&") : "";
    const res = await axios.get(link);

    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    dispatch(handleErrorResponse(error));
  }
};
