//Define actions for Form store
export const FormActions = {
	/**
	 * Action creator to set the loading state of form fetching
	 * @param {boolean} isLoading - The loading state
	 * @returns {Object} Action object with type 'FORM_FETCH_LOADING' and isLoading flag
	 */
	isFormFetchLoading: ( isLoading ) => {
		return {
			type: 'FORM_FETCH_LOADING',
			isLoading,
		};
	},

	updateCreatePopUp: ( status ) => {
		return {
			type: 'UPDATE_CREATE_POPUP_STATUS',
			status,
		};
	},

	updateCreatePopupStage: ( stage ) => {
		return {
			type: 'UPDATE_CREATE_POPUP_STAGE',
			stage,
		};
	},

	updateCreatePopupStep: ( step ) => {
		return {
			type: 'UPDATE_CREATE_POPUP_STEP',
			step,
		};
	},

	updateTitleRequest: () => {
		return {
			type: 'UPDATE_TITLE_REQUEST',
		};
	},

	updateTitleSuccess: ( payload ) => {
		return {
			type: 'UPDATE_TITLE_SUCCESS',
			payload,
		};
	},

	updateTitleError: ( error ) => {
		return {
			type: 'UPDATE_TITLE_ERROR',
			error,
		};
	},

	updateStatusRequest: () => {
		return {
			type: 'UPDATE_STATUS_REQUEST',
		};
	},

	updateStatusSuccess: ( payload ) => {
		return {
			type: 'UPDATE_STATUS_SUCCESS',
			payload,
		};
	},

	updateStatusError: ( error ) => {
		return {
			type: 'UPDATE_STATUS_ERROR',
			error,
		};
	},

	deleteFormRequest: () => {
		return {
			type: 'DELETE_FORM_REQUEST',
		};
	},

	deleteFormSuccess: ( id ) => {
		return {
			type: 'DELETE_FORM_SUCCESS',
			id,
		};
	},

	deleteFormError: ( error ) => {
		return {
			type: 'DELETE_FORM_ERROR',
			error,
		};
	},

	duplicateFormRequest: () => {
		return {
			type: 'DUPLICATE_FORM_REQUEST',
		};
	},

	duplicateFormSuccess: ( data ) => {
		return {
			type: 'DUPLICATE_FORM_SUCCESS',
			data,
		};
	},

	duplicateFormError: ( error ) => {
		return {
			type: 'DUPLICATE_FORM_ERROR',
			error,
		};
	},

	bulkDeleteFormRequest: () => {
		return {
			type: 'BULK_DELETE_FORM_REQUEST',
		};
	},

	bulkDeleteFormSuccess: ( ids ) => {
		return {
			type: 'BULK_DELETE_FORM_SUCCESS',
			ids,
		};
	},

	bulkDeleteFormError: ( error ) => {
		return {
			type: 'BULK_DELETE_FORM_ERROR',
			error,
		};
	},

	bulkStatusUpdateRequest: () => {
		return {
			type: 'BULK_STATUS_UPDATE_REQUEST',
		};
	},

	bulkStatusUpdateSuccess: ( { ids, payload } ) => {
		return {
			type: 'BULK_STATUS_UPDATE_SUCCESS',
			ids,
			payload,
		};
	},

	bulkStatusUpdateError: ( error ) => {
		return {
			type: 'BULK_STATUS_UPDATE_ERROR',
			error,
		};
	},

	/**
	 * Action creator to handle successful form fetch
	 * @param {String} path - path for requesting api
	 * @returns {Object} Action object with type 'FORM_FETCH' and fetched data
	 */
	fetchForm: (
		path,
		currentPage,
		perPage,
		sortBy,
		dateType,
		dateFrom,
		dateTo,
		query,
		formType
	) => {
		return {
			type: 'FETCH_FROM',
			payload: {
				path,
				currentPage,
				perPage,
				sortBy,
				dateType,
				dateFrom,
				dateTo,
				query,
				formType,
			},
		};
	},

	/**
	 * Action creator to handle store form data
	 * @param {Object} data - The fetched form data
	 * @returns {Object} Action object with type 'FORM_FETCH' and fetched data
	 */
	storsForm: ( data ) => {
		return {
			type: 'FORM_STORE',
			data,
		};
	},

	/**
	 * Action creator to handle form fetch error
	 * @param {Object} error - The error occurred during form fetch
	 * @returns {Object} Action object with type 'FORM_FETCH_ERROR' and error information
	 */
	fetchFormError: ( error ) => {
		return {
			type: 'FORM_FETCH_ERROR',
			error,
		};
	},

	updateFormState: ( data ) => {
		return {
			type: 'UPDATE_FORM_STORE',
			data,
		};
	},

	updateForms: ( data ) => {
		return {
			type: 'UPDATE_FORMS',
			data,
		};
	},

	updateCurrentPage: ( currentPage ) => {
		return {
			type: 'UPDATE_CURRENT_PAGE',
			currentPage,
		};
	},

	updateFormItemState: ( formId, data ) => {
		return {
			type: 'UPDATE_FORM_ITEM_STORE',
			formId,
			data,
		};
	},

	updateFormSortBy: ( sortBy ) => {
		return {
			type: 'UPDATE_FORM_SORT_BY',
			sortBy,
		};
	},
	updateFormDateType: ( dateType ) => {
		return {
			type: 'UPDATE_FORM_DATE_TYPE',
			dateType,
		};
	},
	updateFormDateFrom: ( dateFrom ) => {
		return {
			type: 'UPDATE_FORM_DATE_FROM',
			dateFrom,
		};
	},
	updateFormDateTo: ( dateTo ) => {
		return {
			type: 'UPDATE_FORM_DATE_TO',
			dateTo,
		};
	},
	updateFormSearchQuery: ( query ) => {
		return {
			type: 'UPDATE_FORM_SEARCH_QUERY',
			query,
		};
	},
	updateFormsType: ( formType ) => {
		return {
			type: 'UPDATE_FORMS_TYPE',
			formType,
		};
	},
};
