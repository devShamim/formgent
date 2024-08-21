import apiFetch from '@wordpress/api-fetch';
export const SingleFormControls = {
	FETCH_SINGLE_FROM( action ) {
		return apiFetch( { path: action.path } );
	},
	FETCH_RESPONSE( action ) {
		return apiFetch( {
			path: `${ action.payload.path }?page=${ action.payload.currentPage }&per_page=${ action.payload.perPage }&s=${ action.payload.searchItem }&is_read=${ action.payload.readStatus }&form_id=${ action.payload.formID }&order=${ action.payload.orderType }&order_by=id&order_field_type=response`,
		} );
	},
	FETCH_SINGLE_RESPONSE( action ) {
		return apiFetch( {
			path: `${ action.payload.path }?s=${ action.payload.searchItem }&is_read=${ action.payload.readStatus }&form_id=${ action.payload.formID }&order=${ action.payload.orderType }&order_by=id&page=${ action.payload.currentPage }`,
		} );
	},
	FETCH_FIELDS( action ) {
		return apiFetch( {
			path: `${ action.payload.path }?form_id=${ action.payload.formID }`,
		} );
	},
};
