/** @format */
enum types {
	SET_USER = 'SET_USER',
	SIGN_IN = 'SIGN_IN',
	RESTORE_TOKEN = 'RESTORE_TOKEN',
	SIGN_OUT = 'SIGN_OUT',
	SET_PRODUCTS = 'SET_PRODUCTS'
}

export type State = {
	user: any;
	isSignout: boolean;
	isLogin: boolean;
	userToken: string | null;
};

let initialState: any = {
	user: JSON.parse(JSON.stringify(localStorage.getItem('user'))),
	isLogout: JSON.parse(JSON.stringify(localStorage.getItem('login'))),
	isLogin: JSON.parse(JSON.stringify(localStorage.getItem('logout'))),
	userToken: JSON.parse(JSON.stringify(localStorage.getItem('Token')))
};

const reducer = (state: State, action: any) => {
	//console.log({ oldState: state, type: action.type, payload: action.payload });
	switch (action.type) {
		case types.SET_USER:
			localStorage.setItem('user', JSON.stringify(action.payload));
			return {
				...state,
				user: action.payload
			};
		case types.SIGN_IN:
			localStorage.setItem('login', JSON.stringify(action.payload));
			return {
				...state,
				isSignout: false,
				userToken: action.payload
			};

		case types.RESTORE_TOKEN:
			localStorage.setItem('token', JSON.stringify(action.payload));
			return {
				...state,
				userToken: action.payload,
				isLoading: false
			};

		case types.SIGN_OUT:
			localStorage.setItem('logout', JSON.stringify(true));
			localStorage.setItem('token', JSON.stringify(null));
			localStorage.setItem('login', JSON.stringify(false));
			return {
				...state,
				isLogin: false,
				isSignout: true,
				userToken: null
			};

		case types.SET_PRODUCTS:
			return {
				...state,
				produts: action.payload
			};
		default:
			throw new Error('Unexpected action');
	}
};
export { initialState, types, reducer };
