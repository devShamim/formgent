import { SingleFormActions } from './actions';
export const SingleFormResolvers = {
	*getSingleForm( id, timeStamp ) {
		yield SingleFormActions.isSingleFormFetchLoading( true );
		try {
			let singleForm = {};
			if ( id ) {
				const data = yield SingleFormActions.fetchForm(
					`formgent/admin/forms/${ id }`
				);
				singleForm = {
					...data?.form,
					content: JSON.parse( data?.form.content ),
					// submit_button: SubmitButton,
				};
				yield SingleFormActions.storeSingleForm( singleForm, id );
			} else {
				// singleForm = {
				// 	content: {
				// 		fields: [],
				// 	},
				// 	submit_button: SubmitButton,
				// };
			}

			yield SingleFormActions.isSingleFormFetchLoading( false );
			return singleForm;
		} catch ( error ) {
			yield SingleFormActions.fetchSingleFormError( error );
			yield SingleFormActions.isSingleFormFetchLoading( false );
		}
	},
	*getResponseForm(
		currentPage = '1',
		perPage = '10',
		searchItem = '',
		formID = '',
		readStatus = 0,
		orderType = 'asc',
		timestamp = 0
	) {
		yield SingleFormActions.isSingleFormFetchLoading( true );
		try {
			const data = yield SingleFormActions.fetchResponse(
				'formgent/admin/responses',
				currentPage,
				perPage,
				searchItem,
				formID,
				readStatus,
				orderType
			);

			yield SingleFormActions.storeResponse( {
				id: formID,
				responses: data.responses,
				pagination: data.pagination,
			} );
			yield SingleFormActions.isSingleFormFetchLoading( false );
		} catch ( error ) {
			yield SingleFormActions.fetchSingleFormError( error );
			yield SingleFormActions.isSingleFormFetchLoading( false );
		}
	},
	*getSingleResponse(
		currentPage = '1',
		searchItem,
		formID,
		readStatus = 0,
		orderType,
		timestamp = 0
	) {
		try {
			const data = yield SingleFormActions.fetchSingleResponse(
				'formgent/admin/responses/single',
				currentPage,
				searchItem,
				formID,
				readStatus,
				orderType
			);

			yield SingleFormActions.storeSingleResponse( {
				single_response: data.responses,
				single_response_pagination: data.pagination,
			} );
		} catch ( error ) {
			yield SingleFormActions.fetchSingleFormError( error );
		}
	},
	*getSingleFormFields( formID, timestamp = 0 ) {
		yield SingleFormActions.isSingleFormFetchLoading( true );
		try {
			const data = yield SingleFormActions.fetchFields(
				`formgent/admin/responses/table`,
				formID
			);

			yield SingleFormActions.storeFields( {
				form_title: data.form.title,
				fields: data.fields,
				selected_fields: data.selected_fields,
			} );
			yield SingleFormActions.isSingleFormFetchLoading( false );
		} catch ( error ) {
			console.error( 'getSingleFormFields error', error );
			yield SingleFormActions.fetchSingleFormError( error );
			yield SingleFormActions.isSingleFormFetchLoading( false );
		}
	},
};
