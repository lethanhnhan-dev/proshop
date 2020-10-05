import * as productTypes from "../constants/productConstants";
import axios from "axios";

export const listProducts = () => async (dispatch) => {
	try {
		dispatch({ type: productTypes.PRODUCT_LIST_REQUEST });
		const { data } = await axios.get("/api/products");
		dispatch({ type: productTypes.PRODUCT_LIST_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: productTypes.PRODUCT_LIST_FAIL,
			payload:
				error.response && error.response.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const listProductDetails = (id) => async (dispatch) => {
	try {
		dispatch({ type: productTypes.PRODUCT_DETAILS_REQUEST });
		const { data } = await axios.get(`/api/products/${id}`);
		dispatch({ type: productTypes.PRODUCT_DETAILS_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: productTypes.PRODUCT_DETAILS_FAIL,
			payload:
				error.response && error.response.message
					? error.response.data.message
					: error.message,
		});
	}
};
