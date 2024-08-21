//Define actions for Form store
export const SingleFormActions = {
	/**
	 * Action creator to set the loading state of form fetching
	 * @param {boolean} isLoading - The loading state
	 * @returns {Object} Action object with type 'SINGLE_FORM_FETCH_LOADING' and isLoading flag
	 */
	isSingleFormFetchLoading: ( isLoading ) => {
		return {
			type: 'SINGLE_FORM_FETCH_LOADING',
			isLoading,
		};
	},

	updateSingleFormType: ( formType ) => {
		return {
			type: 'UPDATE_SINGLE_FORM_TYPE',
			formType,
		};
	},

	createFormRequest: () => {
		return {
			type: 'CREATE_FORM_REQUEST',
		};
	},

	createFormSuccess: ( data, id ) => {
		return {
			type: 'CREATE_FORM_SUCCESS',
			data,
			id,
		};
	},

	createFormError: ( error ) => {
		return {
			type: 'CREATE_FORM_ERROR',
			error,
		};
	},

	publishFormRequest: () => {
		return {
			type: 'PUBLISH_FORM_REQUEST',
		};
	},

	publishFormSuccess: ( data ) => {
		return {
			type: 'PUBLISH_FORM_SUCCESS',
			data,
		};
	},

	publishFormError: ( error ) => {
		return {
			type: 'PUBLISH_FORM_ERROR',
			error,
		};
	},

	updateActiveField: ( field ) => {
		return {
			type: 'UPDATE_ACTIVE_FIELD',
			field,
		};
	},

	/**
	 * Action creator to handle successful form fetch
	 * @param {String} path - path for requesting api
	 * @returns {Object} Action object with type 'SINGLE_FORM_FETCH' and fetched data
	 */
	fetchForm: ( path ) => {
		return {
			type: 'FETCH_SINGLE_FROM',
			path,
		};
	},

	/**
	 * Action creator to handle store form data
	 * @param {Object} data - The fetched single form data
	 * @returns {Object} Action object with type 'SINGLE_FORM_FETCH' and fetched data
	 */
	storeSingleForm: ( singleForm, id ) => {
		return {
			type: 'SINGLE_FORM_STORE',
			singleForm,
			id,
		};
	},

	/**
	 * Action creator to handle successful form fetch
	 * @param {String} path - path for requesting api
	 * @returns {Object} Action object with type 'FORM_FETCH' and fetched data
	 */
	fetchResponse: (
		path,
		currentPage,
		perPage,
		searchItem,
		formID,
		readStatus,
		orderType
	) => {
		return {
			type: 'FETCH_RESPONSE',
			payload: {
				path,
				currentPage,
				perPage,
				searchItem,
				formID,
				readStatus,
				orderType,
			},
		};
	},

	/**
	 * Action creator to handle successful form fetch
	 * @param {String} path - path for requesting api
	 * @returns {Object} Action object with type 'FETCH_SINGLE_RESPONSE' and fetched data
	 */
	fetchSingleResponse: (
		path,
		currentPage,
		searchItem,
		formID,
		readStatus,
		orderType
	) => {
		return {
			type: 'FETCH_SINGLE_RESPONSE',
			payload: {
				path,
				currentPage,
				searchItem,
				formID,
				readStatus,
				orderType,
			},
		};
	},

	/**
	 * Action creator to handle store form data
	 * @param {Object} data - The fetched form data
	 * @returns {Object} Action object with type 'RESPONSE_STORE' and fetched data
	 */
	storeResponse: ( data ) => {
		return {
			type: 'RESPONSE_STORE',
			data,
		};
	},

	/**
	 * Action creator to handle store form data
	 * @param {Object} data - The fetched form data
	 * @returns {Object} Action object with type 'RESPONSE_SINGLE_STORE' and fetched data
	 */
	storeSingleResponse: ( data ) => {
		return {
			type: 'RESPONSE_SINGLE_STORE',
			data,
		};
	},

	/**
	 * Action creator to handle successful form fetch
	 * @param {String} path - path for requesting api
	 * @returns {Object} Action object with type 'FORM_FETCH' and fetched data
	 */
	fetchFields: ( path, formID ) => {
		return {
			type: 'FETCH_FIELDS',
			payload: { path, formID },
		};
	},

	/**
	 * Action creator to handle store form data
	 * @param {Object} data - The fetched form data
	 * @returns {Object} Action object with type 'FORM_FETCH' and fetched data
	 */
	storeFields: ( data ) => {
		return {
			type: 'FIELDS_STORE',
			data,
		};
	},

	updateCurrentResponsePage: ( currentPage ) => {
		return {
			type: 'UPDATE_CURRENT_RESPONSE_PAGE',
			currentPage,
		};
	},

	selectForm: ( formId ) => {
		return {
			type: 'SELECT_FORM',
			formId,
		};
	},

	/**
	 * Action creator to handle form fetch error
	 * @param {Object} error - The error occurred during form fetch
	 * @returns {Object} Action object with type 'SINGLE_FORM_FETCH_ERROR' and error information
	 */
	fetchSingleFormError: ( error ) => {
		return {
			type: 'SINGLE_FORM_FETCH_ERROR',
			error,
		};
	},

	/**
	 * Action to update form fields
	 * @param {Object} data - updated
	 * @returns {Object} Action object with type 'FORM_FIELDS_UPDATE' and updated data
	 */
	updateFormFields: ( data, id ) => {
		return {
			type: 'FORM_FIELDS_UPDATE',
			data,
			id,
		};
	},

	updateFieldLabel: ( label, fieldId ) => {
		return {
			type: 'UPDATE_FIELD_LABEL',
			payload: { label, fieldId },
		};
	},

	insertSpacer: ( spacer, index ) => {
		return {
			type: 'INSERT_SPACER',
			data: { spacer, index },
		};
	},

	starredChangeRequest: () => {
		return {
			type: 'STARRED_CHANGE_REQUEST',
		};
	},

	starredChangeSuccess: ( id, status ) => {
		return {
			type: 'STARRED_CHANGE_SUCCESS',
			id,
			status,
		};
	},

	starredChangeError: ( error ) => {
		return {
			type: 'STARRED_CHANGE_ERROR',
			error,
		};
	},

	readStatusChangeRequest: () => {
		return {
			type: 'READ_STATUS_CHANGE_REQUEST',
		};
	},

	readStatusChangeSuccess: ( id, status ) => {
		return {
			type: 'READ_STATUS_CHANGE_SUCCESS',
			id,
			status,
		};
	},

	readStatusChangeError: ( error ) => {
		return {
			type: 'READ_STATUS_CHANGE_ERROR',
			error,
		};
	},

	responseDeleteRequest: () => {
		return {
			type: 'RESPONSE_DELETE_REQUEST',
		};
	},

	responseDeleteSuccess: ( formID, ids ) => {
		return {
			type: 'RESPONSE_DELETE_SUCCESS',
			formID,
			ids,
		};
	},

	responseDeleteError: ( error ) => {
		return {
			type: 'RESPONSE_DELETE_ERROR',
			error,
		};
	},

	responseColumnUpdateRequest: () => {
		return {
			type: 'RESPONSE_COLUMN_UPDATE_REQUEST',
		};
	},

	responseColumnUpdateSuccess: () => {
		return {
			type: 'RESPONSE_COLUMN_UPDATE_SUCCESS',
		};
	},

	responseColumnUpdateError: ( error ) => {
		return {
			type: 'RESPONSE_COLUMN_UPDATE_ERROR',
			error,
		};
	},

	getResponseNotes: ( notes ) => {
		return {
			type: 'GET_RESPONSE_NOTES',
			notes,
		};
	},

	addResponseNotes: ( note ) => {
		return {
			type: 'ADD_RESPONSE_NOTES',
			note,
		};
	},

	updateResponseNotes: ( id, note ) => {
		return {
			type: 'UPDATE_RESPONSE_NOTES',
			id,
			note,
		};
	},

	deleteResponseNotes: ( id ) => {
		return {
			type: 'DELETE_RESPONSE_NOTES',
			id,
		};
	},
};
