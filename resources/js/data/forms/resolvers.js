import { FormActions } from './actions';
export const FormResolvers = {
	*getForms(
		currentPage = '1',
		perPage = '10',
		timestamp = 0,
		sortBy = 'date_created',
		dateType = 'all',
		dateFrom = null,
		dateTo = null,
		query = '',
		formType = 'all'
	) {
		yield FormActions.isFormFetchLoading( true );
		try {
			const data = yield FormActions.fetchForm(
				'formgent/admin/forms',
				currentPage,
				perPage,
				sortBy,
				dateType,
				dateFrom,
				dateTo,
				query,
				formType
			);
			yield FormActions.storsForm( {
				forms: data.forms,
				pagination: data.pagination,
				form_edit_url: data.form_edit_url,
			} );
			yield FormActions.isFormFetchLoading( false );
		} catch ( error ) {
			yield FormActions.fetchFormError( error );
			yield FormActions.isFormFetchLoading( false );
		}
	},
};
