import apiFetch from '@wordpress/api-fetch';
export const FormControls = {
	FETCH_FROM( action ) {
		return apiFetch( {
			path: `formgent/admin/forms?page=${ action.payload.currentPage }&per_page=${ action.payload.perPage }&date_type=${ action.payload.dateType }&sort_by=${ action.payload.sortBy }&date_frame[from]=${ action.payload.dateFrom }&date_frame[to]=${ action.payload.dateTo }&s=${ action.payload.query }&type=${ action.payload.formType }`,
		} );
	},
};
