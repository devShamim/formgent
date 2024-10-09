import {
	AntDrawer,
	AntDropdown,
	AntSpin,
	AntTable,
} from '@formgent/components';
import deleteData from '@formgent/helper/deleteData';
import fetchData from '@formgent/helper/fetchData';
import patchData from '@formgent/helper/patchData';
import postData from '@formgent/helper/postData';
import { formatDate } from '@formgent/helper/utils';
import { resolveSelect, useDispatch, useSelect } from '@wordpress/data';
import { useEffect, useRef, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { addQueryArgs } from '@wordpress/url';
import { CSVLink } from 'react-csv';
import ReactSVG from 'react-inlinesvg';
import TableDrawer from './TableDrawer';
import TableHeader from './TableHeader';
import { TableStyle } from './style';

// Icon
import PopUp from '@formgent/components/PopUp';
import alignLeftIcon from '@icon/align-left.svg';
import arrowsDownIcon from '@icon/arrows-down.svg';
import arrowsUpIcon from '@icon/arrows-up.svg';
import calendarIcon from '@icon/calendar.svg';
import checkIcon from '@icon/check.svg';
import chevronDownIcon from '@icon/chevron-down.svg';
import csvIcon from '@icon/csv.svg';
import ellipsisVIcon from '@icon/ellipsis-v.svg';
import expandIcon from '@icon/expand.svg';
import gridIcon from '@icon/grid.svg';
import hashIcon from '@icon/hash.svg';
import linkIcon from '@icon/link.svg';
import mailOpenIcon from '@icon/mail-open.svg';
import mailIcon from '@icon/mail.svg';
import pdfIcon from '@icon/pdf.svg';
import phoneIcon from '@icon/phone.svg';
import pinIcon from '@icon/pin.svg';
import starIcon from '@icon/star.svg';
import textIcon from '@icon/text.svg';
import trashAltIcon from '@icon/trash-alt.svg';
import userIcon from '@icon/user.svg';
import xlsIcon from '@icon/xls.svg';
import FormDeleteAlert from './FormDeleteAlert';

export default function Table() {
	const [ selectedRowKeys, setSelectedRowKeys ] = useState( [] );
	const [ activeTab, setActiveTab ] = useState( 'completed' );
	const [ selectedKey, setSelectedKey ] = useState( 'all' );
	const [ singleResponse, setSingleResponse ] = useState( null );
	const [ openDrawer, setOpenDrawer ] = useState( false );
	const [ filteredData, setFilteredData ] = useState( [] );
	const [ searchItem, setSearchItem ] = useState( '' );
	const [ readStatus, setReadStatus ] = useState( 0 );
	const [ orderFieldType, setOrderFieldType ] = useState( 'response' );
	const [ orderType, setOrderType ] = useState( 'desc' );
	const [ orderBy, setOrderBy ] = useState( 'created_at' );
	const [ customColumns, setCustomColumns ] = useState( [] );
	const [ frozenColumns, setFrozenColumns ] = useState( [] );
	const [ hiddenColumns, setHiddenColumns ] = useState( [] );
	const [ visibleColumns, setVisibleColumns ] = useState( [] );
	const [ fieldColumnHide, setFieldColumnHide ] = useState( [] );
	const [ responses, setResponses ] = useState( [] );
	const [ responseFields, setResponseFields ] = useState( [] );
	const [ csvExportData, setCSVExportData ] = useState( [] );
	const [ starredChanging, setStarredChanging ] = useState( '' );
	const [ drawerLoading, setDrawerLoading ] = useState( false );
	const [ downloadLoading, setDownloadLoading ] = useState( false );
	const [ isActivateFormDeleteModal, setIsActivateFormDeleteModal ] =
		useState( false );

	// Reference
	const csvLinkRef = useRef();
	const debounceTimeout = useRef( null );
	const isInitialMount = useRef( true );

	// Retrieve from the store
	const {
		updateCurrentResponsePage,
		starredChangeRequest,
		starredChangeSuccess,
		starredChangeError,
		readStatusChangeRequest,
		readStatusChangeSuccess,
		readStatusChangeError,
		responseDeleteRequest,
		responseDeleteSuccess,
		responseDeleteError,
		responseColumnUpdateSuccess,
		responseColumnUpdateError,
		responseSingleChangeRequest,
		responseSingleChangeSuccess,
		responseSingleChangeError,
		getResponseNotes,
		addResponseNotes,
		updateResponseNotes,
		deleteResponseNotes,
	} = useDispatch( 'formgent' );

	const { SingleFormReducer } = useSelect( ( select ) => {
		return select( 'formgent' ).getSingleFormState();
	}, [] );

	const {
		forms,
		pagination,
		isLoading,
		starredItems,
		isStarredChanging,
		readStatusItems,
		isReadStatusChanging,
		isResponseDeleting,
		isResponseColumnUpdating,
		isResponseSingleChanging,
		notes,
		fields,
		selected_fields,
		single_response,
		single_response_pagination,
	} = SingleFormReducer;

	const { CommonReducer } = useSelect( ( select ) => {
		return select( 'formgent' ).getCommonState();
	}, [] );
	const { useParams } = CommonReducer.routerComponents;
	const { id } = useParams();

	// Fetch Responses
	function fetchResponse( page ) {
		return resolveSelect( 'formgent' ).getResponseForm(
			page?.current || pagination.current_page,
			10,
			searchItem,
			parseInt( id ),
			readStatus,
			orderFieldType,
			orderType,
			orderBy,
			Date.now()
		);
	}

	// handleSelectItems
	function handleSelectItems( { key } ) {
		setSelectedKey( key );

		const selectFunctions = {
			all: () => {
				setReadStatus( 0 );
				fetchResponse();
			},
			read: () => {
				setReadStatus( 1 );
			},
			unread: () => {
				if ( readStatus === 0 ) {
					fetchResponse();
				} else {
					setReadStatus( 0 );
				}
			},
			starred: () =>
				responses?.filter(
					( item ) => starredItems[ item.id ] === '1'
				),
			unstarred: () =>
				responses?.filter(
					( item ) => starredItems[ item.id ] === '0'
				),
		};

		// Get the sorted data based on the key
		const selectedData = selectFunctions[ key ]
			? selectFunctions[ key ]()
			: responses;

		setFilteredData( selectedData );
	}

	// handleSortby
	function handleSortby( item, dropdownId ) {
		setOrderBy( dropdownId );
		if (
			dropdownId === 'id' ||
			dropdownId === 'created_at' ||
			dropdownId === 'user_email'
		) {
			setOrderFieldType( 'response' );
		} else {
			setOrderFieldType( 'answer' );
		}
		const { key } = item;
		const sortFunctions = {
			ascending: () => {
				setOrderType( 'asc' );
			},
			descending: () => {
				setOrderType( 'desc' );
			},
			freeze: () => {
				// setFrozenColumns( ( prevFrozenColumns ) => {
				// 	return [ ...prevFrozenColumns, dropdownId ];
				// } );

				setFrozenColumns( ( prevFrozenColumns ) => {
					if ( prevFrozenColumns.includes( dropdownId ) ) {
						return prevFrozenColumns.filter(
							( id ) => id !== dropdownId
						);
					} else {
						return [ dropdownId ];
					}
				} );
			},
			hide: () => {
				setHiddenColumns( ( prevHiddenColumns ) => {
					return [ ...prevHiddenColumns, dropdownId ];
				} );
				setVisibleColumns(
					visibleColumns.includes( dropdownId )
						? visibleColumns.filter(
								( item ) => item !== dropdownId
						  )
						: visibleColumns
				);
			},
		};

		sortFunctions[ key ]();
	}

	function handleColumnIcon( type ) {
		const columnIcon = {
			email: mailIcon,
			text: textIcon,
			textarea: alignLeftIcon,
			number: hashIcon,
			'phone-number': phoneIcon,
			website: linkIcon,
		};

		return columnIcon[ type ] || alignLeftIcon;
	}

	// handleTableDrawer
	function handleDrawerClose() {
		setOpenDrawer( null );
		setSelectedRowKeys( [] );
	}

	async function handleTableDrawer( record, nav ) {
		if ( isResponseSingleChanging ) return;

		responseSingleChangeRequest();

		setOpenDrawer( true );
		setDrawerLoading( true );
		// Calculate the initial drawerResponse index based on the current page and record position
		let drawerResponse =
			responses.findIndex( ( item ) => item.id === record ) + 1;
		let totalDrawerResponse =
			( pagination.current_page - 1 ) * 10 + drawerResponse;

		// Adjust drawerResponse based on the navigation direction
		switch ( nav ) {
			case 'prev':
				totalDrawerResponse -= 1;
				break;
			case 'next':
				totalDrawerResponse += 1;
				break;
			default:
				break;
		}

		// Calculate the new page and local drawerResponse index
		const newPage = Math.ceil( totalDrawerResponse / 10 );
		const localDrawerResponse = totalDrawerResponse % 10 || 10;

		// Determine updateDrawerResponse based on the newPage value
		const updateDrawerResponse =
			newPage === 1
				? localDrawerResponse
				: ( newPage - 1 ) * 10 + localDrawerResponse;

		if ( newPage === pagination.current_page ) {
			// If the drawerResponse is still within the current page
			await resolveSelect( 'formgent' ).getSingleResponse(
				updateDrawerResponse,
				searchItem,
				parseInt( id ),
				readStatus,
				orderType,
				orderBy,
				Date.now()
			);
			handleResponseNotes( responses[ localDrawerResponse - 1 ]?.id );
			responseSingleChangeSuccess( updateDrawerResponse );
		} else {
			// Update the page and fetch the data for the new page
			updateCurrentResponsePage( newPage );

			// Fetch the new page data
			const updateFormResponse = await resolveSelect(
				'formgent'
			).getResponseForm(
				newPage || 1,
				10,
				searchItem,
				parseInt( id ),
				readStatus,
				orderFieldType,
				orderType,
				orderBy,
				Date.now()
			);

			// Wait for the new data to be fully loaded
			await new Promise( ( resolve ) => setTimeout( resolve, 100 ) ); // Small delay to ensure data is ready

			// After fetching the new data, get the specific response on the new page
			await resolveSelect( 'formgent' ).getSingleResponse(
				updateDrawerResponse,
				searchItem,
				parseInt( id ),
				readStatus,
				orderType,
				orderBy,
				Date.now()
			);

			responseSingleChangeSuccess( updateDrawerResponse );

			const updatedResponses =
				updateFormResponse.SingleFormReducer.forms[ id ]?.responses;

			// Ensure that responses are updated before triggering handleResponseNotes
			if ( updatedResponses[ localDrawerResponse - 1 ]?.id ) {
				handleResponseNotes(
					updatedResponses[ localDrawerResponse - 1 ]?.id
				);
			} else {
				console.warn( 'Response ID is undefined' );
				responseSingleChangeError();
			}
		}
	}

	// handleResponseNotes
	async function handleResponseNotes( responseID ) {
		if ( ! responseID ) return;

		const fetchResponseNotes = await fetchData(
			`admin/responses/notes?response_id=${ responseID }`
		);

		if ( fetchResponseNotes ) {
			getResponseNotes( fetchResponseNotes.notes );
		}
	}

	// handleStarred
	async function handleStarred( id, isStarredStatus, source ) {
		setStarredChanging( id );
		if ( isStarredChanging ) return;

		starredChangeRequest();
		const reverseStarredStatus = isStarredStatus === '1' ? 0 : 1;

		const updateStarredStatus = await patchData(
			`admin/responses/${ id }/starred/`,
			{ is_starred: reverseStarredStatus }
		);
		if ( updateStarredStatus ) {
			starredChangeSuccess( id, reverseStarredStatus );
			setStarredChanging( '' );
			if ( source === 'drawer' ) {
				handleTableDrawer( id );
			}
		} else {
			starredChangeError();
			setStarredChanging( '' );
		}
	}

	// handleRead
	async function handleRead( id, isReadStatus, source ) {
		if ( isReadStatusChanging ) return;

		readStatusChangeRequest();

		const reverseReadStatus = isReadStatus === '1' ? 0 : 1;

		const updateReadStatus = await patchData(
			`admin/responses/${ id }/read/`,
			{ is_read: reverseReadStatus }
		);
		if ( updateReadStatus ) {
			readStatusChangeSuccess( id, reverseReadStatus );

			if ( source === 'drawer' ) {
				handleTableDrawer( id );
			}
		} else {
			readStatusChangeError();
		}
	}

	// Date Format
	const dateFormatOptions = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	};

	// Select Items Data
	const selectItems = [
		{
			label: (
				<span className="dropdown-header-content">
					<ReactSVG width="16" height="16" src={ gridIcon } />
					All
					{ selectedKey === 'all' && (
						<span className="active-icon">
							<ReactSVG
								width="10"
								height="10"
								src={ checkIcon }
							/>
						</span>
					) }
				</span>
			),
			key: 'all',
		},
		{
			label: (
				<span className="dropdown-header-content">
					<ReactSVG width="16" height="16" src={ mailOpenIcon } />
					Read
					{ selectedKey === 'read' && (
						<span className="active-icon">
							<ReactSVG
								width="10"
								height="10"
								src={ checkIcon }
							/>
						</span>
					) }
				</span>
			),
			key: 'read',
		},
		{
			label: (
				<span className="dropdown-header-content">
					<ReactSVG width="16" height="16" src={ mailIcon } />
					Unread
					{ selectedKey === 'unread' && (
						<span className="active-icon">
							<ReactSVG
								width="10"
								height="10"
								src={ checkIcon }
							/>
						</span>
					) }
				</span>
			),
			key: 'unread',
		},
		{
			label: (
				<span className="dropdown-header-content">
					<ReactSVG
						width="16"
						height="16"
						src={ starIcon }
						fill="currentColor"
					/>
					Starred
					{ selectedKey === 'starred' && (
						<span className="active-icon">
							<ReactSVG
								width="10"
								height="10"
								src={ checkIcon }
							/>
						</span>
					) }
				</span>
			),
			key: 'starred',
		},
		{
			label: (
				<span className="dropdown-header-content">
					<ReactSVG width="16" height="16" src={ starIcon } />
					Unstarred
					{ selectedKey === 'unstarred' && (
						<span className="active-icon">
							<ReactSVG
								width="10"
								height="10"
								src={ checkIcon }
							/>
						</span>
					) }
				</span>
			),
			key: 'unstarred',
		},
	];

	// Sort Items Data
	const sortItems = ( dropdownId ) => [
		{
			label: (
				<span className="dropdown-header-content">
					<ReactSVG width="16" height="16" src={ arrowsUpIcon } />
					Ascending
					{ orderType === 'asc' && orderBy === dropdownId && (
						<span className="active-icon">
							<ReactSVG
								width="10"
								height="10"
								src={ checkIcon }
							/>
						</span>
					) }
				</span>
			),
			key: 'ascending',
		},
		{
			label: (
				<span className="dropdown-header-content">
					<ReactSVG width="16" height="16" src={ arrowsDownIcon } />
					Descending
					{ orderType === 'desc' && orderBy === dropdownId && (
						<span className="active-icon">
							<ReactSVG
								width="10"
								height="10"
								src={ checkIcon }
							/>
						</span>
					) }
				</span>
			),
			key: 'descending',
		},
		{
			label: (
				<span className="dropdown-header-content">
					<ReactSVG width="16" height="16" src={ pinIcon } />
					{ frozenColumns.includes( dropdownId )
						? 'Unfreeze'
						: 'Freeze' }{ ' ' }
					Column
				</span>
			),
			key: 'freeze',
		},
		// {
		// 	label: (
		// 		<span className="dropdown-header-content">
		// 			<ReactSVG width="16" height="16" src={ hideIcon } />
		// 			Hide Column
		// 		</span>
		// 	),
		// 	key: 'hide',
		// },
	];

	// Default Column Data
	const defaultColumns = [
		{
			key: 'id',
			dataIndex: 'id',
			title: () => (
				<div className="formgent-column-action formgent-column-action__id">
					<AntDropdown
						menu={ {
							items: selectItems,
							onClick: handleSelectItems,
						} }
						trigger={ [ 'click' ] }
						placement="bottomLeft"
						overlayStyle={ { minWidth: '240px' } }
					>
						<a onClick={ ( e ) => e.preventDefault() }>
							<ReactSVG
								width="16"
								height="16"
								src={ chevronDownIcon }
							/>
						</a>
					</AntDropdown>
				</div>
			),
			render: ( text, record ) => {
				const isStarred =
					starredItems[ record.id ] !== undefined
						? starredItems[ record.id ]
						: '0';
				return (
					<div className="formgent-form-table-item-wrap">
						{ record.id }
						<ReactSVG
							width="16"
							height="16"
							src={ starIcon }
							className={ isStarred === '1' ? 'starred' : '' }
							onClick={ () =>
								handleStarred( record.id, isStarred )
							}
						/>
					</div>
				);
			},
		},
		{
			key: 'created_at',
			dataIndex: 'created_at',
			title: () => (
				<div className="formgent-column-action">
					<span className="formgent-column-action__title">
						<span className="formgent-column-action__icon">
							<ReactSVG
								width="16"
								height="16"
								src={ calendarIcon }
							/>
						</span>
						Submission Date
					</span>
					<AntDropdown
						menu={ {
							items: sortItems( 'created_at' ),
							onClick: ( item ) =>
								handleSortby( item, 'created_at' ),
						} }
						trigger={ [ 'click' ] }
						placement="bottomRight"
						overlayStyle={ { minWidth: '240px' } }
					>
						<a onClick={ ( e ) => e.preventDefault() }>
							<ReactSVG
								width="16"
								height="16"
								src={ ellipsisVIcon }
							/>
						</a>
					</AntDropdown>
				</div>
			),
			render: ( text, record ) => {
				return (
					<div className="formgent-form-date">
						{ formatDate(
							'en-US',
							record.created_at,
							dateFormatOptions
						) }
						<button
							className="response-table__drawer__open"
							onClick={ () => {
								handleTableDrawer( record.id );
							} }
						>
							<ReactSVG
								width="12"
								height="12"
								src={ expandIcon }
							/>
							View
						</button>
					</div>
				);
			},
		},
		{
			key: 'user_email',
			dataIndex: 'user_email',
			title: () => (
				<div className="formgent-column-action">
					<span className="formgent-column-action__title">
						<span className="formgent-column-action__icon">
							<ReactSVG width="16" height="16" src={ userIcon } />
						</span>
						Submitted By
					</span>
					<AntDropdown
						menu={ {
							items: sortItems( 'user_email' ),
							onClick: ( item ) =>
								handleSortby( item, 'user_email' ),
						} }
						trigger={ [ 'click' ] }
						placement="bottomRight"
						overlayStyle={ { minWidth: '240px' } }
					>
						<a onClick={ ( e ) => e.preventDefault() }>
							<ReactSVG
								width="16"
								height="16"
								src={ ellipsisVIcon }
							/>
						</a>
					</AntDropdown>
				</div>
			),
			render: ( text, record ) => {
				return <div>{ record.user_email }</div>;
			},
		},
	];

	// Table Operations
	const rowSelection = {
		selectedRowKeys,
		onChange: handleRowSelection,
	};

	function handleRowSelection( newSelectedRowKeys ) {
		setSelectedRowKeys( newSelectedRowKeys );
	}

	function handleTableChange( page ) {
		setHiddenColumns( [] );
		setFrozenColumns( [] );
		updateCurrentResponsePage( page?.current );
		fetchResponse( page );
	}

	function handleSearch( value ) {
		// Clear the previous debounce timeout if it exists
		if ( debounceTimeout.current ) {
			clearTimeout( debounceTimeout.current );
		}

		// Set a new timeout
		debounceTimeout.current = setTimeout( () => {
			setSearchItem( value );
		}, 300 );
	}

	// Handle Delete
	function handleActivateDeleteFormModal( ids, source ) {
		setIsActivateFormDeleteModal( true );
	}
	function handleCancelDeleteAlert() {
		setIsActivateFormDeleteModal( false );
	}

	async function handleDelete( ids, source ) {
		if ( isResponseDeleting ) return;
		responseDeleteRequest();

		const deleteItems = source === 'drawer' ? ids : selectedRowKeys;
		const deleteResponse = await deleteData(
			addQueryArgs( `admin/responses?form_id=${ parseInt( id ) }`, {
				ids: deleteItems,
			} )
		);

		if ( deleteResponse ) {
			setSingleResponse( null );
			setOpenDrawer( false );
			setSelectedRowKeys( [] );
			responseDeleteSuccess( id, deleteItems );
			setIsActivateFormDeleteModal( false );
			handleTableChange();
		} else {
			responseDeleteError();
		}
	}

	// Use effect to update
	useEffect( () => {
		setResponseFields( fields );
	}, [ fields ] );

	// Generate Column
	const generateCustomColumns = () => {
		return ( selected_fields || [] )
			.filter( ( fieldName ) =>
				fields.some( ( field ) => field.name === fieldName )
			)
			.map( ( fieldName ) => {
				const field = fields?.find(
					( field ) => field.name === fieldName
				);

				return {
					key: fieldName,
					dataIndex: fieldName,
					title: () => (
						<div className="formgent-column-action">
							<span className="formgent-column-action__title">
								<span className="formgent-column-action__icon">
									<ReactSVG
										width="16"
										height="16"
										src={ handleColumnIcon( field?.type ) }
									/>
								</span>
								{ field?.label.replace(
									/<\/?[^>]+(>|$)/g,
									''
								) }
							</span>
							<AntDropdown
								menu={ {
									items: sortItems( fieldName ),
									onClick: ( item ) =>
										handleSortby( item, fieldName ),
								} }
								trigger={ [ 'click' ] }
								placement="bottomRight"
								overlayStyle={ { minWidth: '240px' } }
							>
								<a onClick={ ( e ) => e.preventDefault() }>
									<ReactSVG
										width="16"
										height="16"
										src={ ellipsisVIcon }
									/>
								</a>
							</AntDropdown>
						</div>
					),
					render: ( text, record ) => {
						const response =
							responses &&
							responses?.find( ( r ) => r.id === record.id );
						if ( response ) {
							const answer = response.answers?.find(
								( a ) => a.field_name === fieldName
							);
							if ( answer ) {
								return <div>{ answer.value }</div>;
							}
						}
						return <div>No data Found</div>;
					},
				};
			} );
	};

	// Handle Show/Hide Column
	async function handleColumn() {
		if ( ! fieldColumnHide ) {
			if ( isResponseColumnUpdating ) return;
			const updateColumn = await postData( 'admin/responses/fields', {
				form_id: id,
				field_names: visibleColumns,
			} );

			if ( updateColumn ) {
				fetchResponse();
				// Remove all visibleColumns from hiddenColumns
				const updatedHiddenColumns = hiddenColumns.filter(
					( column ) => ! visibleColumns.includes( column )
				);
				setHiddenColumns( updatedHiddenColumns );

				responseColumnUpdateSuccess( visibleColumns );
				resolveSelect( 'formgent' ).getSingleFormFields(
					parseInt( id ),
					Date.now()
				);
			} else {
				responseColumnUpdateError();
			}
		} else {
			setHiddenColumns( [ ...hiddenColumns, fieldColumnHide ] );
		}
	}

	useEffect( () => {
		const generatedColumns = generateCustomColumns();
		const allColumns = [ ...defaultColumns, ...generatedColumns ];

		setCustomColumns(
			allColumns.map( ( col ) => {
				const isDefaultColumn = defaultColumns.some(
					( defaultCol ) => defaultCol.dataIndex === col.dataIndex
				);

				return {
					...col,
					fixed: frozenColumns.includes( col.dataIndex )
						? isDefaultColumn
							? 'left'
							: 'right'
						: null,
					hidden: hiddenColumns.includes( col.key ),
				};
			} )
		);
	}, [
		selected_fields,
		responses,
		visibleColumns,
		hiddenColumns,
		frozenColumns,
		starredItems,
		readStatusItems,
		filteredData,
		starredChanging,
		isStarredChanging,
	] );

	useEffect( () => {
		if ( ! selected_fields ) return;

		if (
			JSON.stringify( visibleColumns ) !==
			JSON.stringify( selected_fields )
		) {
			setVisibleColumns( selected_fields );
			fetchResponse();
		}
	}, [ selected_fields ] );

	useEffect( () => {
		handleColumn();
	}, [ visibleColumns ] );

	useEffect( () => {
		if ( isInitialMount.current ) {
			// Skip on initial mount
			isInitialMount.current = false;
		} else {
			// Run the effect normally after initial render
			fetchResponse();
		}
	}, [ searchItem, readStatus, orderFieldType, orderType, orderBy ] );

	useEffect( () => {
		if ( single_response ) {
			setSingleResponse( single_response[ 0 ] || null );
			rowSelection.onChange( [ single_response[ 0 ]?.id ] );
		}
	}, [ single_response ] );

	useEffect( () => {
		const formResponses = forms && forms[ id ]?.responses;
		setFilteredData( formResponses );
		setResponses( formResponses );

		formResponses?.forEach( ( response ) => {
			starredChangeSuccess( response.id, response.is_starred );
			readStatusChangeSuccess( response.id, response.is_read );
		} );
	}, [ forms ] );

	useEffect( () => {
		setSingleResponse( null );
		setSelectedRowKeys( [] );

		// fetchResponse();
		handleColumn();
		resolveSelect( 'formgent' ).getSingleFormFields(
			parseInt( id ),
			Date.now()
		);
	}, [ id ] );

	useEffect( () => {
		setCustomColumns( defaultColumns );

		// resolveSelect( 'formgent' ).getSingleFormFields( parseInt( id ) );
	}, [] );

	// Export CSV Data
	useEffect( () => {
		if ( csvExportData.length ) {
			csvLinkRef.current?.link.click();
		}
	}, [ csvExportData ] );

	return (
		<TableStyle>
			<AntSpin spinning={ isLoading }>
				<TableHeader
					id={ id }
					responses={ responses }
					selectedRowKeys={ selectedRowKeys }
					setSelectedRowKeys={ setSelectedRowKeys }
					handleTableChange={ handleTableChange }
					handleSearch={ handleSearch }
					activeTab={ activeTab }
					setActiveTab={ setActiveTab }
					visibleColumns={ visibleColumns }
					setVisibleColumns={ setVisibleColumns }
					responseFields={ responseFields }
					setResponseFields={ setResponseFields }
					setFieldColumnHide={ setFieldColumnHide }
					handleActivateDeleteFormModal={
						handleActivateDeleteFormModal
					}
				/>

				<AntTable
					componentTokens={ {
						Table: {
							fontFamily: 'Inter',
							headerColor: '#6e6e6e',
							headerBg: '#d5d5d5',
							headerSplitColor: '#ffffff',
							cellPaddingBlock: 20,
						},
					} }
					rowSelection={ rowSelection }
					columns={ customColumns }
					dataSource={ filteredData }
					rowKey={ ( record ) => record.id }
					bordered
					pagination={ {
						current: pagination?.current_page,
						pageSize: 10,
						total: pagination?.total_items,
					} }
					className="formgent-result-table"
					onChange={ handleTableChange }
				/>
			</AntSpin>

			<AntDrawer
				onClose={ handleDrawerClose }
				open={ openDrawer }
				width={ 600 }
				rootClassName="single-response-drawer"
				styles={ { header: { display: 'none' } } }
			>
				<TableDrawer
					response={ singleResponse }
					handleTableDrawer={ handleTableDrawer }
					notes={ notes }
					handleResponseNotes={ handleResponseNotes }
					addResponseNotes={ addResponseNotes }
					updateResponseNotes={ updateResponseNotes }
					deleteResponseNotes={ deleteResponseNotes }
					handleDrawerClose={ handleDrawerClose }
					single_response_pagination={ single_response_pagination }
					handleActivateDeleteFormModal={ ( id ) =>
						handleActivateDeleteFormModal( id, 'drawer' )
					}
					handleStarred={ ( id, isStarredStatus ) =>
						handleStarred( id, isStarredStatus, 'drawer' )
					}
					handleRead={ ( id, isReadStatus ) =>
						handleRead( id, isReadStatus, 'drawer' )
					}
					dateFormatOptions={ dateFormatOptions }
					drawerLoading={ drawerLoading }
					setDrawerLoading={ setDrawerLoading }
				/>
			</AntDrawer>

			{ isActivateFormDeleteModal && (
				<PopUp
					open={ isActivateFormDeleteModal }
					title={
						<>
							<span className="formgent-popup-title-icon">
								<ReactSVG
									src={ trashAltIcon }
									width="24"
									height="24"
								/>
							</span>
							{ __( 'Delete Response?', 'formgent' ) }
						</>
					}
					onCancel={ handleCancelDeleteAlert }
					onSubmit={ handleDelete }
					hasCancelButton
					hasSubmitButton
					isActiveSubmit
					submitText={
						isResponseDeleting
							? __( 'Deleting', 'formgent' )
							: __( 'Delete', 'formgent' )
					}
					className="formgent-form-delete-alert"
				>
					<FormDeleteAlert
						// error={ formDeletionError }
						formTitle={ selectedRowKeys }
					/>
				</PopUp>
			) }
		</TableStyle>
	);
}
