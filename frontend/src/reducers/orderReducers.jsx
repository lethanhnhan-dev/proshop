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
