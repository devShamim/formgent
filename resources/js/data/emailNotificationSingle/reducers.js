const DEFAULT_STATE = {
	isLoading: {
		initialValues: false,
		presetFields: false,
		createData: false,
		updateData: false,
	},
	isCreated: false,
	isNotFound: false,
	id: null,
	initialValues: {},
	presetFields: [],
	responseStatus: null,
	refresh: false,
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
		case 'UPDATE_EMAIL_NOTIFICATION_SINGLE_PRESET_FIELDS':
			return {
				...state,
				presetFields: payload,
			};
		case 'UPDATE_EMAIL_NOTIFICATION_SINGLE_RESPONSE_STATUS':
			return {
				...state,
				responseStatus: payload,
			};
		case 'UPDATE_REFRESH_EMAIL_NOTIFICATIONS':
			return {
				...state,
				refresh: payload,
			};
		case 'RESET_EMAIL_NOTIFICATION_SINGLE':
			return {
				...state,
				id: null,
				initialValues: {},
			};

		default:
			return state;
	}
};
