const DEFAULT_STATE = {
	isLoading: {
		initialValues: false,
		createData: false,
		updateData: false,
	},
	isCreated: false,
	isNotFound: false,
	id: null,
	initialValues: {},
	placeholders: [],
	responseStatus: null,
};

export const EmailNotificationSingleReducer = (
	state = DEFAULT_STATE,
	action
) => {
	const { type, payload } = action;

	switch ( type ) {
		case 'UPDATE_IS_LOADING_EMAIL_NOTIFICATION_SINGLE':
			return {
				...state,
				isLoading: {
					...state.isLoading,
					[ payload.key ]: payload.value,
				},
			};
		case 'UPDATE_IS_CREATED_EMAIL_NOTIFICATION_SINGLE':
			return {
				...state,
				isCreated: payload,
			};
		case 'UPDATE_IS_NOT_FOUND_EMAIL_NOTIFICATION_SINGLE':
			return {
				...state,
				isNotFound: payload,
			};
		case 'UPDATE_EMAIL_NOTIFICATION_SINGLE_ID':
			return {
				...state,
				id: payload,
			};
		case 'UPDATE_EMAIL_NOTIFICATION_SINGLE_INITIAL_VALUES':
			return {
				...state,
				initialValues: payload,
			};
		case 'UPDATE_EMAIL_NOTIFICATION_SINGLE_RESPONSE_STATUS':
			return {
				...state,
				responseStatus: payload,
			};
		default:
			return state;
	}
};