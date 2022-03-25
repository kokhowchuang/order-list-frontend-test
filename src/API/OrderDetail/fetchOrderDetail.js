import axios from "axios";
import { handleErrorResponse } from "../../helper";

const { REACT_APP_API_URL } = process.env;

export const fetchOrderDetail = (id) => async (dispatch) => {
  try {
    const res = await axios.get(
      `${REACT_APP_API_URL}/orderdetails?orderid=` + id
    );

    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    dispatch(handleErrorResponse(error));
  }
};
