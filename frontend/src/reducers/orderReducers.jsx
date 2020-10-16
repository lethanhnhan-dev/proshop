import * as orderTypes from "../constants/orderConstants";

export const orderCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case orderTypes.ORDER_CREATE_REQUEST:
			return { loading: true };
		case orderTypes.ORDER_CREATE_SUCCESS:
			return {
				loading: true,
				success: true,
				order: action.payload,
			};
		case orderTypes.ORDER_CREATE_FAIL:
			return {
				loading: false,
				success: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

export const orderDetailsReducer = (
	state = {
		loading: true,
		orderItems: [],
		shippingAddress: {},
	},
	action,
) => {
	switch (action.type) {
		case orderTypes.ORDER_DETAILS_REQUEST:
			return { ...state, loading: true };
		case orderTypes.ORDER_DETAILS_SUCCESS:
			return {
				order: action.payload,
				loading: false,
			};
		case orderTypes.ORDER_DETAILS_FAIL:
			return {
				loading: false,
				success: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

export const orderPayReducer = (state = {}, action) => {
	switch (action.type) {
		case orderTypes.ORDER_PAY_REQUEST:
			return { loading: true };
		case orderTypes.ORDER_PAY_SUCCESS:
			return {
				loading: false,
				success: true,
			};
		case orderTypes.ORDER_PAY_FAIL:
			return {
				loading: false,
				success: false,
				error: action.payload,
			};
		case orderTypes.ORDER_PAY_RESET:
			return {};
		default:
			return state;
	}
};

export const orderListMyReducer = (
	state = {
		orders: [],
	},
	action,
) => {
	switch (action.type) {
		case orderTypes.ORDER_LIST_MY_REQUEST:
			return { loading: true };
		case orderTypes.ORDER_LIST_MY_SUCCESS:
			return {
				loading: false,
				orders: action.payload,
			};
		case orderTypes.ORDER_LIST_MY_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};
