import apiFetch from '@wordpress/api-fetch';
export const WebhooksControls = {
	FETCH_WEBHOOK( action ) {
		return apiFetch( {
			path: `formgent/admin/webhooks?page=${ action.payload.currentPage }&per_page=${ action.payload.perPage }&date_type=last_month`,
		} );
	},
	FETCH_SINGLE_WEBHOOK( action ) {
		return apiFetch( {
			path: action.path,
		} );
	},
};
