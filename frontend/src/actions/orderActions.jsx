import * as orderTypes from "../constants/orderConstants";
import { logout } from "./userActions";
import axios from "axios";

export const createOrder = (order) => async (dispatch, getState) => {
	try {
		dispatch({
			type: orderTypes.ORDER_CREATE_REQUEST,
		});

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.post(`/api/orders`, order, config);

		dispatch({
			type: orderTypes.ORDER_CREATE_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message;
		if (message === "Not authorized, token failed") {
			dispatch(logout());
		}
		dispatch({
			type: orderTypes.ORDER_CREATE_FAIL,
			payload: message,
		});
	}
};
