import * as userTypes from "../constants/userConstants";

export const userLoginReducer = (state = {}, action) => {
	switch (action.type) {
		case userTypes.USER_LOGIN_REQUEST:
			return { loading: true };
		case userTypes.USER_LOGIN_SUCCESS:
			return { loading: false, userInfo: action.payload };
		case userTypes.USER_LOGIN_FAIL:
			return { loading: false, error: action.payload };
		case userTypes.USER_LOGOUT:
			return {};
		default:
			return state;
	}
};
