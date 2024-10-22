const DEFAULT_STATE = {
	isLoadingData: false,
	isProcessing: false,
	refresh: false,
	responseStatus: null,
	data: [],
	queryArgs: {
		page: 1,
		per_page: 20,
	},
	foundItems: 0,
	isCreated: false,
	isLoading: {
		initialValues: false,
		presetFields: false,
		createData: false,
		updateData: false,
	},
};

export const EmailNotificationReducer = ( state = DEFAULT_STATE, action ) => {
	const { type, payload } = action;

	switch ( type ) {
		case 'UPDATE_IS_LOADING_EMAIL_NOTIFICATIONS':
			return {
				...state,
				isLoadingData: payload,
			};
		case 'UPDATE_PROCESSING_EMAIL_NOTIFICATIONS':
			return {
				...state,
				isProcessing: payload,
			};
		case 'UPDATE_REFRESH_EMAIL_NOTIFICATIONS':
			return {
				...state,
				refresh: payload,
			};
		case 'UPDATE_EMAIL_NOTIFICATION_DATA':
			return {
				...state,
				data: payload,
			};
		case 'UPDATE_EMAIL_NOTIFICATION_ITEM':
			return {
				...state,
				data: state.data.map( ( item ) => {
					if ( `${ item.id }` === `${ payload.id }` ) {
						return { ...item, ...payload.data };
					}

					return item;
				} ),
			};
		case 'DELETE_EMAIL_NOTIFICATION_ITEM':
			return {
				...state,
				data: state.data.filter(
					( item ) => `${ item.id }` !== `${ payload.id }`
				),
			};
		case 'UPDATE_EMAIL_NOTIFICATION_RESPONSE_STATUS':
			return {
				...state,
				responseStatus: payload,
			};
		case 'UPDATE_EMAIL_NOTIFICATION_QUERY_ARGS':
			return {
				...state,
				queryArgs: payload,
			};
		case 'UPDATE_EMAIL_NOTIFICATION_FOUND_ITEMS':
			return {
				...state,
				foundItems: payload,
			};
		case 'UPDATE_IS_CREATED_EMAIL_NOTIFICATION_SINGLE':
			return {
				...state,
				isCreated: payload,
			};
		case 'UPDATE_IS_LOADING_EMAIL_NOTIFICATION_SINGLE':
			return {
				...state,
				isLoading: {
					...state.isLoading,
					[ payload.key ]: payload.value,
				},
			};
		default:
			return state;
	}
};
