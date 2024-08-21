const DEFAULT_STATE = {
	forms: null,
	selectedFormType: '',
	selectedFormId: null,
	isCreatingForm: false,
	isLoading: false,
	isUpdatingForm: false,
	isStarredChanging: false,
	isReadStatusChanging: false,
	isResponseDeleting: false,
	isResponseColumnUpdating: false,
	starredItems: {},
	readStatusItems: {},
	pagination: {
		current_page: '1',
		total_pages: '1',
		total_items: '0',
	},
	activeCustomizerTab: 'element',
	activeField: '',
	error: null,
};

export const SingleFormReducer = ( state = DEFAULT_STATE, action ) => {
	const { type, isLoading, data, currentPage, error } = action;

	let fieldList = {};
	switch ( type ) {
		case 'CREATE_FORM_REQUEST':
			return {
				...state,
				isCreatingForm: true,
			};
		case 'CREATE_FORM_SUCCESS':
			return {
				...state,
				forms: {
					...state.forms,
					[ action.id ]: {
						data,
					},
				},
			};
		case 'CREATE_FORM_ERROR':
			return {
				...state,
				error: error,
			};
		case 'PUBLISH_FORM_REQUEST':
			return {
				...state,
				isUpdatingForm: true,
			};
		case 'PUBLISH_FORM_SUCCESS':
			return {
				...state,
				singleForm: {
					...state.singleForm,
					...action.data,
				},
				isUpdatingForm: false,
			};
		case 'PUBLISH_FORM_ERROR':
			return {
				...state,
				isUpdatingForm: false,
				error: error,
			};
		case 'UPDATE_ACTIVE_FIELD':
			return {
				...state,
				activeField: action?.field,
			};
		case 'UPDATE_SINGLE_FORM_TYPE':
			return {
				...state,
				selectedFormType: action.formType,
			};
		case 'SINGLE_FORM_FETCH_LOADING':
			return {
				...state,
				isLoading: isLoading,
			};
		case 'SINGLE_FORM_FETCH':
			return {
				...state,
				forms: data,
			};
		case 'SINGLE_FORM_STORE':
			return {
				...state,
				forms: {
					...state.forms,
					[ action.id ]: action.singleForm,
				},
				singleForm: action.singleForm,
			};
		case 'RESPONSE_STORE':
			return {
				...state,
				forms: {
					...state.forms,
					[ data.id ]: {
						responses: data.responses,
					},
				},
				pagination: data.pagination,
			};
		case 'RESPONSE_SINGLE_STORE':
			return {
				...state,
				...data,
			};
		case 'FIELDS_STORE':
			return {
				...state,
				...data,
			};
		case 'UPDATE_CURRENT_RESPONSE_PAGE':
			return {
				...state,
				pagination: {
					...state.pagination,
					current_page: currentPage,
				},
			};
		case 'SELECT_FORM':
			return {
				...state,
				selectedFormId: action.formId,
			};
		case 'SINGLE_FORM_FETCH_ERROR':
			return {
				...state,
				error: error,
			};
		case 'FORM_FIELDS_UPDATE':
			return {
				...state,
				forms: {
					...state.forms,
					[ action.id ]: {
						...state.forms[ action.id ],
						content: {
							...state.forms[ action.id ].content,
							fields: data,
						},
					},
				},
				// singleForm: {
				// 	...state.singleForm,
				// 	content: {
				// 		...state.singleForm.content,
				// 		fields: data,
				// 	},
				// },
			};
		case 'UPDATE_FIELD_LABEL':
			fieldList = structuredClone( state?.singleForm?.content?.fields );
			fieldList = fieldList.map( ( item ) => {
				if ( item?.id === action?.payload?.fieldId ) {
					return {
						...item,
						general_option: {
							...item.general_option,
							label: action?.payload?.label,
						},
					};
				}
				return item;
			} );
			return {
				...state,
				singleForm: {
					...state.singleForm,
					content: {
						...state.singleForm.content,
						fields: fieldList,
					},
				},
			};
		case 'STARRED_CHANGE_REQUEST':
			return {
				...state,
				isStarredChanging: true,
			};
		case 'STARRED_CHANGE_SUCCESS':
			return {
				...state,
				starredItems: {
					...state.starredItems,
					[ action.id ]: String( action.status ),
				},
				isStarredChanging: false,
			};
		case 'STARRED_CHANGE_ERROR':
			return {
				...state,
				error: error,
				isStarredChanging: false,
			};
		case 'READ_STATUS_CHANGE_REQUEST':
			return {
				...state,
				isReadStatusChanging: true,
			};
		case 'READ_STATUS_CHANGE_SUCCESS':
			return {
				...state,
				readStatusItems: {
					...state.readStatusItems,
					[ action.id ]: String( action.status ),
				},
				isReadStatusChanging: false,
			};
		case 'READ_STATUS_CHANGE_ERROR':
			return {
				...state,
				error: error,
				isReadStatusChanging: false,
			};
		case 'RESPONSE_DELETE_REQUEST':
			return {
				...state,
				isResponseDeleting: true,
			};
		case 'RESPONSE_DELETE_SUCCESS':
			return {
				...state,
				forms: {
					...state.forms,
					[ action.formID ]: {
						responses: state.forms[
							action.formID
						].responses.filter(
							( response ) => ! action.ids.includes( response.id )
						),
					},
				},
				isResponseDeleting: false,
			};
		case 'RESPONSE_DELETE_ERROR':
			return {
				...state,
				error: error,
				isResponseDeleting: false,
			};
		case 'RESPONSE_COLUMN_UPDATE_REQUEST':
			return {
				...state,
				isResponseColumnUpdating: true,
			};
		case 'RESPONSE_COLUMN_UPDATE_SUCCESS':
			return {
				...state,
				isResponseColumnUpdating: false,
			};
		case 'RESPONSE_COLUMN_UPDATE_ERROR':
			return {
				...state,
				error: error,
				isResponseColumnUpdating: false,
			};

		case 'GET_RESPONSE_NOTES':
			return {
				...state,
				notes: action.notes,
			};
		case 'ADD_RESPONSE_NOTES':
			return {
				...state,
				notes: [ ...state.notes, action.note ],
			};
		case 'UPDATE_RESPONSE_NOTES':
			return {
				...state,
			};
		case 'DELETE_RESPONSE_NOTES':
			return {
				...state,
			};
		default:
			return state;
	}
};
