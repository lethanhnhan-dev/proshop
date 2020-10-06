import * as cartTypes from "../constants/cartConstants";

export const cartReducers = (state = { cartItems: [] }, action) => {
	switch (action.type) {
		case cartTypes.CART_ADD_ITEM:
			const item = action.payload;

			const existItem = state.cartItems.find(
				(x) => x.product === item.product,
			);

			if (existItem) {
				return {
					...state,
					cartItems: state.cartItems.map((x) =>
						x.product === existItem.product ? item : x,
					),
				};
			} else {
				return {
					...state,
					cartItems: [...state.cartItems, item],
				};
			}
		case cartTypes.CART_REMOVE_ITEM:
			return {
				...state,
				cartItems: state.cartItems.filter(
					(x) => x.product !== action.payload,
				),
			};
		default:
			return state;
	}
};
