import apiFetch from '@wordpress/api-fetch';
export const SingleFormControls = {
	FETCH_SINGLE_FROM( action ) {
		return apiFetch( { path: action.path } );
	},
	FETCH_RESPONSE( action ) {
		return apiFetch( {
			path: `${ action.payload.path }?page=${ action.payload.currentPage }&per_page=${ action.payload.perPage }&s=${ action.payload.searchItem }&is_read=${ action.payload.readStatus }&form_id=${ action.payload.formID }&order=${ action.payload.orderType }&order_by=${ action.payload.orderBy }&order_field_type=${ action.payload.orderFieldType }`,
		} );
	},
	FETCH_SINGLE_RESPONSE( action ) {
		return apiFetch( {
			path: `${ action.payload.path }?s=${ action.payload.searchItem }&is_read=${ action.payload.readStatus }&form_id=${ action.payload.formID }&order=${ action.payload.orderType }&order_by=${ action.payload.orderBy }&page=${ action.payload.currentPage }`,
		} );
	},
	FETCH_FIELDS( action ) {
		return apiFetch( {
			path: `${ action.payload.path }?form_id=${ action.payload.formID }`,
		} );
	},
	FETCH_SUMMARY( action ) {
		return apiFetch( {
			path: `formgent/admin/forms/${ action.payload.formId }/summary?field_name=${ action.payload.fieldName }&per_page=${ action.payload.perPage }&page=1`,
		} );
	},
	FETCH_SUMMARY_FIELDS( action ) {
		return apiFetch( {
			path: action.path,
		} );
	},
	FETCH_ANALYTICS_SUMMARY( action ) {
		return apiFetch( {
			path: action.path,
		} );
	},
};
