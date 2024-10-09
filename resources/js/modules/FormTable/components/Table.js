import { useState, useEffect, useRef } from '@wordpress/element';
import { useDispatch, useSelect } from '@wordpress/data';
import { applyFilters } from '@wordpress/hooks';
import { AntTable, AntSpin, AntPagination } from '@formgent/components';
import { formatDate } from '@formgent/helper/utils';
import { TableStyle } from './style';
import { __ } from '@wordpress/i18n';
import TableAction from './TableAction';
import TableBulkSelection from './TableBulkSelection';
import TitleBox from './TitleBox';
import postData from '@formgent/helper/postData';
import FormTableStatus from './FormTableStatus';
import Shortcode from './Shortcode';

export default function Table( props ) {
	const [ selectedRowKeys, setSelectedRowKeys ] = useState( [] );
	const [ selectedForms, setSelectedForms ] = useState( [] );
	const [ editableForm, setEditableForm ] = useState( null );

	const {
		updateCurrentPage,
		bulkStatusUpdateRequest,
		bulkStatusUpdateSuccess,
		bulkStatusUpdateError,
	} = useDispatch( 'formgent' );

	const {
		forms,
		pagination,
		isLoading,
		form_edit_url,
		isFormDeleting,
		sortBy,
		dateType,
		isStatusUpdating,
		singleStatusUpdated,
		isFormDuplicating,
	} = props;

	const [ filteredForms, setFilteredForms ] = useState( forms );

	const { CommonReducer } = useSelect( ( select ) => {
		return select( 'formgent' ).getCommonState();
	}, [] );
	const { Link } = CommonReducer.routerComponents;

	const rowSelection = {
		selectedRowKeys,
		onChange: handleRowSelection,
	};

	function handleRowSelection( newSelectedRowKeys ) {
		setSelectedRowKeys( newSelectedRowKeys );

		const selectedFormsNames = forms
			.filter( ( form ) => newSelectedRowKeys.includes( form.id ) )
			.map( ( form ) => form.title );

		setSelectedForms( selectedFormsNames );
	}

	useEffect( () => {
		let sortedForms = [ ...forms ];
		if ( sortBy === 'date_created' ) {
			sortedForms.sort(
				( a, b ) => new Date( b.created_at ) - new Date( a.created_at )
			);
		} else if ( sortBy === 'title' ) {
			sortedForms.sort( ( a, b ) => a.title.localeCompare( b.title ) );
		}
		setFilteredForms( sortedForms );
	}, [ forms, sortBy ] );

	useEffect( () => {
		const filteredForms = forms.filter( ( form ) => {
			const matchesFormType =
				dateType === 'all' || form.type === dateType;
			return matchesFormType;
		} );
		setFilteredForms( filteredForms );
	}, [ forms, dateType ] );

	const dateFormatOptions = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	};

	const formTableColumns = applyFilters( 'formgent_form_table_columns', [
		{
			title: 'Name',
			className: 'formgent-form-checkbox',
			render: ( text, record ) => (
				<TitleBox
					form={ record }
					form_edit_url={ form_edit_url }
					editableForm={ editableForm }
					setEditableForm={ setEditableForm }
				/>
			),
			width: 330,
		},
		{
			title: 'Shortcode',
			className: 'formgent-form-shortcode',
			render: ( text, record ) => <Shortcode record={ record } />,
			width: 200,
		},
		{
			title: 'Responses',
			className: 'formgent-head-response',
			render: ( text, record ) => (
				<div className="helpgent-form-responses">
					<Link to={ `forms/${ record?.id }/response` }>
						{ record?.total_unread_responses > 0 ? (
							<div className="helpgent-badge helpgent-badge-danger helpgent-badge-circle helpgent-badge-small">
								{ record?.total_responses }
							</div>
						) : (
							'0'
						) }
					</Link>
				</div>
			),
		},
		{
			title: 'Created By',
			className: 'formgent-head-created-by',
			render: ( text, record ) => (
				<div className="helpgent-form-username">
					{ record?.username }
				</div>
			),
		},
		{
			title: 'Updated',
			className: 'formgent-head-updated-at',
			render: ( text, record ) => {
				const date =
					'string' === typeof record?.updated_at
						? record?.updated_at
						: record?.created_at;
				return (
					<div className="helpgent-form-date">
						{ formatDate( 'en-US', date, dateFormatOptions ) }
					</div>
				);
			},
		},
		{
			title: __( 'Status', 'formgent' ),
			className: 'formgent-head-status',
			render: ( text, record ) => (
				<div className="formgent-form-status">
					<FormTableStatus
						form={ record }
						setEditableForm={ setEditableForm }
						isStatusUpdating={ isStatusUpdating }
						singleStatusUpdated={ singleStatusUpdated }
					/>
				</div>
			),
		},
		{
			title: 'More',
			className: 'formgent-head-action',
			render: ( text, record ) => {
				const date =
					'string' === typeof record?.updated_at
						? record?.updated_at
						: record?.created_at;
				return (
					<div className="formgent-form-action">
						<TableAction
							form={ record }
							editableForm={ editableForm }
							setEditableForm={ setEditableForm }
							isFormDeleting={ isFormDeleting }
							isFormDuplicating={ isFormDuplicating }
							pagination={ pagination }
						/>
					</div>
				);
			},
		},
	] );

	function handleFormTableChange( pagination ) {
		updateCurrentPage( pagination?.current );
	}

	//update bulk task status
	async function handleBulkStatusUpdate( newStatus ) {
		const dataSubmit = {
			ids: selectedRowKeys,
			status: newStatus,
		};
		bulkStatusUpdateRequest( true );
		try {
			const bulkStatusUpdateResponse = await postData(
				'admin/forms/status',
				dataSubmit
			);
			bulkStatusUpdateSuccess( {
				ids: selectedRowKeys,
				payload: { status: newStatus },
			} );
			setSelectedRowKeys( [] );
		} catch ( error ) {
			bulkStatusUpdateError( error );
		}
	}

	//custom table pagination
	const [ showTotalText, setShowTotalText ] = useState( '' );
	const computeShowTotalText = ( total, range ) => {
		return `${ range[ 0 ] } - ${ range[ 1 ] } of ${ total } forms`;
	};
	useEffect( () => {
		const range = [
			( pagination?.current_page - 1 ) * 1 + 1,
			Math.min( pagination?.current_page * 1, pagination?.total_items ),
		];
		const totalText = computeShowTotalText(
			pagination?.total_items,
			range
		);
		setShowTotalText( totalText );
	}, [ pagination ] );
	const handleTableChange = ( page, pageSize ) => {
		updateCurrentPage( page );
		const range = [
			( page - 1 ) * pageSize + 1,
			Math.min( page * pageSize, pagination.total_items ),
		];
		const totalText = computeShowTotalText( pagination.total_items, range );
		setShowTotalText( totalText );
	};

	return (
		<>
			<TableStyle>
				<AntSpin spinning={ isLoading }>
					{ selectedRowKeys.length !== 0 && (
						<TableBulkSelection
							data={ forms }
							selectedRowKeys={ selectedRowKeys }
							setSelectedRowKeys={ setSelectedRowKeys }
							isFormDeleting={ isFormDeleting }
							selectedForms={ selectedForms }
							setSelectedForms={ setSelectedForms }
							handleBulkStatusUpdate={ handleBulkStatusUpdate }
						/>
					) }
					<AntTable
						componentTokens={ {
							Table: {
								headerColor: '#6e6e6e',
								headerBg: '#d5d5d5',
								headerSplitColor: '#d5d5d5',
								cellPaddingBlock: 20,
							},
						} }
						showHeader={ selectedRowKeys.length === 0 }
						rowSelection={ rowSelection }
						columns={ formTableColumns }
						dataSource={ filteredForms }
						rowKey={ ( record ) => record?.id }
						pagination={ {
							current: pagination?.current_page,
							pageSize: 10,
							total: pagination?.total_items,
							position: [ 'none' ],
						} }
						onChange={ handleFormTableChange }
						scroll={ {
							x: 1300,
						} }
					/>
					<div className="formgent-forms-pagination-wrapper">
						<span className="formgent-forms-pagination-total-count">
							{ showTotalText }
						</span>
						<AntPagination
							current={ pagination?.current_page }
							pageSize={ 10 }
							total={ pagination?.total_items }
							onChange={ handleTableChange } // This updates the current page
						/>
					</div>
				</AntSpin>
			</TableStyle>
		</>
	);
}
