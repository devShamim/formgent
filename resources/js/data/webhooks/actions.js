//Define actions for Form store
export const WebhooksActions = {
	/**
	 * Action creator to set the loading state of form fetching
	 * @param {boolean} isLoading - The loading state
	 * @returns {Object} Action object with type 'FETCH_WEBHOOK_REQUEST' and isLoading flag
	 */
	fetchWebhookRequest: ( isLoading ) => {
		return {
			type: 'FETCH_WEBHOOK_REQUEST',
			isLoading,
		};
	},
	fetchWebhook: ( path, currentPage, perPage ) => {
		return {
			type: 'FETCH_WEBHOOK',
			payload: { path, currentPage, perPage },
		};
	},
	fetchWebhookSuccess: ( data ) => {
		return {
			type: 'FETCH_WEBHOOK_SUCCESS',
			data,
		};
	},
	fetchWebhookError: ( error ) => {
		return {
			type: 'FETCH_WEBHOOK_ERROR',
			error,
		};
	},
	fetchSingleWebhookRequest: ( isSingleHookFetching ) => {
		return {
			type: 'FETCH_SINGLE_WEBHOOK_REQUEST',
			isSingleHookFetching,
		};
	},
	fetchSingleWebhook: ( path ) => {
		return {
			type: 'FETCH_SINGLE_WEBHOOK',
			path,
		};
	},
	fetchSingleWebhookSuccess: ( singleHook ) => {
		return {
			type: 'FETCH_SINGLE_WEBHOOK_SUCCESS',
			singleHook,
		};
	},
	fetchSingleWebhookError: ( error ) => {
		return {
			type: 'FETCH_SINGLE_WEBHOOK_ERROR',
			error,
		};
	},
	deleteHookRequest: ( isDeleting ) => {
		return {
			type: 'DELETE_HOOK_REQUEST',
			isDeleting,
		};
	},
	deleteHookSuccess: ( metaId ) => {
		console.log( metaId );
		return {
			type: 'DELETE_HOOK_SUCCESS',
			metaId,
		};
	},
	deleteHookError: () => {
		return {
			type: 'DELETE_HOOK_ERROR',
		};
	},
	deleteBulkHookRequest: () => {
		return {
			type: 'DELETE_BULK_HOOK_REQUEST',
		};
	},
	deleteBulkHookSuccess: ( ids ) => {
		return {
			type: 'DELETE_BULK_HOOK_SUCCESS',
			ids,
		};
	},
	deleteBulkHookError: () => {
		return {
			type: 'DELETE_BULK_HOOK_ERROR',
		};
	},
	changeHookStatusRequest: ( isStatusChanging ) => {
		return {
			type: 'CHANGE_HOOK_STATUS_REQUEST',
			isStatusChanging,
		};
	},
	changeHookStatusSuccess: ( status, metaId ) => {
		return {
			type: 'CHANGE_HOOK_STATUS_SUCCESS',
			payload: { status, metaId },
		};
	},
	changeHookStatusError: () => {
		return {
			type: 'CHANGE_HOOK_STATUS_ERROR',
		};
	},
	updateHookRequest: ( isDeleting ) => {
		return {
			type: 'UPDATE_HOOK_REQUEST',
			isDeleting,
		};
	},
	updateHookSuccess: ( data ) => {
		return {
			type: 'UPDATE_HOOK_SUCCESS',
			data,
		};
	},
	updateHookError: () => {
		return {
			type: 'UPDATE_HOOK_ERROR',
		};
	},
	updateCurrentPage: ( currentPage ) => {
		return {
			type: 'UPDATE_CURRENT_PAGE',
			currentPage,
		};
	},
};
