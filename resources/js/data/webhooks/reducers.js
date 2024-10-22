const DEFAULT_STATE = {
	webhooks: [],
	pagination: {
		current_page: '1',
		total_items: '0',
	},
	webhooksHub: null,
	isLoading: false,
	isSingleHookFetching: false,
	isDeleting: false,
	isStatusChanging: false,
	isHookUpdating: false,
	error: null,
};

export const WebhooksReducer = ( state = DEFAULT_STATE, action ) => {
	//console.log( state );
	switch ( action.type ) {
		case 'FETCH_WEBHOOK_REQUEST':
			return {
				...state,
				isLoading: action.isLoading,
			};
		case 'FETCH_WEBHOOK_SUCCESS':
			return {
				...state,
				...action.data,
			};
		case 'FETCH_WEBHOOK_ERROR':
			return {
				...state,
				isLoading: false,
				error: action.error,
			};
		case 'FETCH_SINGLE_WEBHOOK_REQUEST':
			return {
				...state,
				isSingleHookFetching: true,
			};
		case 'FETCH_SINGLE_WEBHOOK_SUCCESS':
			return {
				...state,
				webhooksHub: {
					...state.webhooks,
					[ action.metaId ]: action.singleHook,
				},
			};
		case 'DELETE_HOOK_REQUEST':
			return {
				...state,
				isDeleting: action.isDeleting,
			};
		case 'DELETE_HOOK_SUCCESS':
			const remainingHooks = state.webhooks.filter(
				( item ) => item.meta_id !== action.metaId
			);
			return {
				...state,
				webhooks: remainingHooks,
				pagination: {
					...state.pagination,
					total_items: remainingHooks.length,
				},
				isDeleting: false,
			};
		case 'DELETE_HOOK_ERROR':
			return {
				...state,
				isDeleting: false,
				error: action.error,
			};
		case 'DELETE_BULK_HOOK_REQUEST':
			return {
				...state,
				isBulkDeleting: true,
			};
		case 'DELETE_BULK_HOOK_SUCCESS':
			const remainingBulkDelete = state.webhooks.filter(
				( item ) => ! action.ids.includes( item.meta_id )
			);
			return {
				...state,
				webhooks: remainingBulkDelete,
				pagination: {
					...state.pagination,
					total_items: remainingBulkDelete.length,
				},
				isBulkDeleting: false,
			};
		case 'DELETE_BULK_HOOK_ERROR':
			return {
				...state,
				isBulkDeleting: false,
				error: action.error,
			};
		case 'CHANGE_HOOK_STATUS_REQUEST':
			return {
				...state,
				isStatusChanging: action.isStatusChanging,
			};
		case 'CHANGE_HOOK_STATUS_SUCCESS':
			const updatedHooks = state.webhooks.map( ( item ) => {
				if ( item.meta_id === action.payload.metaId ) {
					const updatedMetaValue = JSON.parse( item.meta_value );
					updatedMetaValue.active = action.payload.status;
					return {
						...item,
						meta_value: JSON.stringify( updatedMetaValue ),
					};
				}
			} );
			return {
				...state,
				webhooks: updatedHooks,
				isStatusChanging: false,
			};
		case 'CHANGE_HOOK_STATUS_ERROR':
			return {
				...state,
				isStatusChanging: false,
				error: error,
			};
		case 'UPDATE_HOOK_REQUEST':
			return {
				...state,
				isHookUpdating: action.isHookUpdating,
			};
		case 'UPDATE_HOOK_SUCCESS':
			return {
				...state,
				isHookUpdating: false,
			};
		case 'UPDATE_HOOK_ERROR':
			return {
				...state,
				isHookUpdating: false,
				error: error,
			};
		case 'UPDATE_CURRENT_PAGE':
			return {
				...state,
				pagination: {
					...state.pagination,
					current_page: action.currentPage,
				},
			};
		default:
			return state;
	}
};
