const DEFAULT_STATE = {
	forms: [],
	addBackBtn: false,
	isCreatePopupOpen: false,
	createPopupStep: '1',
	selectedTemplate: null,
	templateElements: null,
	createFormStage: 'initial',
	pagination: {
		current_page: '1',
		total_items: '0',
	},
	form_edit_url: '',
	isLoading: false,
	isFormDeleting: false,
	isFormBulkDeleting: false,
	isBulkStatusUpdating: false,
	isTitleUpdating: false,
	isStatusUpdating: false,
	singleStatusUpdated: false,
	isFilterActive: false,
	error: null,
	responseTableData: {},
	sortBy: 'date_created',
	dateType: 'all',
	query: '',
	formType: 'all',
	dateFrame: {
		from: null,
		to: null,
	},
};

export const FormReducer = ( state = DEFAULT_STATE, action ) => {
	const {
		type,
		isLoading,
		data,
		currentPage,
		error,
		sortBy,
		dateType,
		dateFrom,
		dateTo,
		query,
		formType,
	} = action;
	switch ( type ) {
		case 'FORM_FETCH_LOADING':
			return {
				...state,
				isLoading: isLoading,
			};
		case 'UPDATE_CREATE_POPUP_STATUS':
			return {
				...state,
				isCreatePopupOpen: action.status,
			};
		case 'UPDATE_CREATE_POPUP_STAGE':
			return {
				...state,
				createFormStage: action.stage,
			};
		case 'UPDATE_CREATE_POPUP_STEP':
			return {
				...state,
				createPopupStep: action.step,
			};
		case 'UPDATE_TITLE_REQUEST':
			return {
				...state,
				isTitleUpdating: true,
			};
		case 'UPDATE_TITLE_SUCCESS':
			const updatedTitleFormList = state.forms.map( ( item ) => {
				if ( item.id === action.payload.id ) {
					return {
						...item,
						title: action.payload.title,
					};
				}
				return item; // Return item for items not matching
			} );
			return {
				...state,
				isTitleUpdating: false,
				forms: updatedTitleFormList,
			};
		case 'UPDATE_TITLE_ERROR':
			return {
				...state,
				isTitleUpdating: false,
				error: error,
			};
		case 'UPDATE_STATUS_REQUEST':
			return {
				...state,
				isStatusUpdating: true,
				singleStatusUpdated: true,
			};
		case 'UPDATE_STATUS_SUCCESS':
			const updatedStatusFormList = state.forms.map( ( item ) => {
				if ( item.id === action.payload.id ) {
					return {
						...item,
						status: action.payload.status,
					};
				}
				return item; // Return item for items not matching
			} );
			return {
				...state,
				isStatusUpdating: false,
				forms: updatedStatusFormList,
			};
		case 'UPDATE_STATUS_ERROR':
			return {
				...state,
				isStatusUpdating: false,
				error: error,
			};
		case 'DELETE_FORM_REQUEST':
			return {
				...state,
				isFormDeleting: true,
			};
		case 'DELETE_FORM_SUCCESS':
			const updatedForms = state.forms.filter(
				( item ) => item.id !== action.id
			);
			return {
				...state,
				isFormDeleting: false,
				forms: updatedForms,
				pagination: {
					...state.pagination,
					total_items: updatedForms.length,
				},
			};
		case 'DELETE_FORM_ERROR':
			return {
				...state,
				isFormDeleting: false,
				error: error,
			};
		case 'BULK_DELETE_FORM_REQUEST':
			return {
				...state,
				isFormBulkDeleting: true,
			};
		case 'BULK_DELETE_FORM_SUCCESS':
			const bulkUpdatedForm = state.forms.filter(
				( item ) => ! action.ids.includes( item.id )
			);
			return {
				...state,
				isFormBulkDeleting: false,
				forms: bulkUpdatedForm,
				pagination: {
					...state.pagination,
					total_items: bulkUpdatedForm.length,
				},
			};
		case 'BULK_DELETE_FORM_ERROR':
			return {
				...state,
				isFormBulkDeleting: false,
				error: error,
			};
		case 'BULK_STATUS_UPDATE_REQUEST':
			return {
				...state,
				isBulkStatusUpdating: true,
				singleStatusUpdated: false,
			};
		case 'BULK_STATUS_UPDATE_SUCCESS':
			const bulkStatusUpdatedForms = state.forms.map( ( item ) => {
				if ( action.ids.includes( item.id ) ) {
					return {
						...item,
						status: action.payload.status,
					};
				}
				return item;
			} );
			return {
				...state,
				isBulkStatusUpdating: false,
				forms: bulkStatusUpdatedForms,
				singleStatusUpdated: false,
			};

		case 'BULK_STATUS_UPDATE_ERROR':
			return {
				...state,
				isBulkStatusUpdating: false,
				error: action.error,
			};
		case 'FORM_STORE':
			return {
				...state,
				...data,
			};
		case 'FORM_FETCH_ERROR':
			return {
				...state,
				error: error,
			};
		case 'UPDATE_FORM_STORE':
			return {
				...state,
				...data,
			};
		case 'UPDATE_CURRENT_PAGE':
			return {
				...state,
				pagination: {
					...state.pagination,
					current_page: currentPage,
				},
			};
		case 'UPDATE_FORM_ITEM_STORE':
			let form = state.forms.find(
				( form ) => form.id === action.formId
			);

			if ( ! form ) {
				return form;
			}

			Object.assign( form, data );

			return {
				...state,
			};
		case 'UPDATE_FORMS':
			return {
				...state,
				forms: [ data, ...state.forms ],
				pagination: {
					...state.pagination,
					total_items: state.pagination.total_items + 1,
				},
			};
		case 'UPDATE_FORM_SORT_BY':
			return {
				...state,
				sort_by: sortBy,
			};
		case 'UPDATE_FORM_DATE_TYPE':
			return {
				...state,
				date_type: dateType,
			};
		case 'UPDATE_FORM_DATE_FROM':
			return {
				...state,
				date_frame: {
					...state.dateFrame,
					from: dateFrom,
				},
				isFilterActive: true,
			};
		case 'UPDATE_FORM_DATE_TO':
			return {
				...state,
				date_frame: {
					...state.dateFrame,
					to: dateTo,
				},
				isFilterActive: true,
			};
		case 'UPDATE_FORM_SEARCH_QUERY':
			return {
				...state,
				s: query,
				isFilterActive: true,
			};
		case 'UPDATE_FORMS_TYPE':
			return {
				...state,
				type: formType,
				isLoading: true,
				isFilterActive: true,
			};
		default:
			return state;
	}
};
