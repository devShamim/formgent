import { useDispatch } from '@wordpress/data';
import { addQueryArgs } from '@wordpress/url';
import { AntCheckbox, AntButton } from '@formgent/components';
import { useState, useEffect, useRef } from '@wordpress/element';
import { TablkSelectionStyle } from './style';
import { __ } from '@wordpress/i18n';
import ReactSVG from 'react-inlinesvg';
import trashIcon from '@icon/trash.svg';
import toggleIcon from '@icon/toggle.svg';
import trashAlt from '@icon/trash-alt.svg';
import deleteData from '@formgent/helper/deleteData';
import checkClickedOutside from '@formgent/helper/checkClickedOutside';
import PopUp from '@formgent/components/PopUp';
import FormDeleteAlert from './FormDeleteAlert';

export default function TableBulkSelection( props ) {
	const {
		data,
		selectedRowKeys,
		setSelectedRowKeys,
		isFormDeleting,
		selectedForms,
		setSelectedForms,
		handleBulkStatusUpdate,
	} = props;
	const [ isMoreBulkActionOpen, setMoreBulkActionOpen ] = useState( false );
	const [ isDeleteModalOpen, setDeleteModalOpen ] = useState( false );
	const moreBulkActionRef = useRef( null );

	const {
		bulkDeleteFormRequest,
		bulkDeleteFormSuccess,
		bulkDeleteFormError,
	} = useDispatch( 'formgent' );

	function handleBulkSelection( event ) {
		if ( event.target.checked ) {
			setSelectedRowKeys( data.map( ( item ) => item.id ) );
			setSelectedForms( data.map( ( item ) => item.title ) );
		} else {
			setSelectedRowKeys( [] );
			setSelectedForms( [] );
		}
	}

	function handleClearSelection() {
		setSelectedRowKeys( [] );
	}

	async function handleBulkDelete() {
		bulkDeleteFormRequest();
		try {
			const bulkDeleteResponse = await deleteData(
				addQueryArgs( `admin/forms`, {
					ids: selectedRowKeys,
				} )
			);
			bulkDeleteFormSuccess( selectedRowKeys );
			setSelectedRowKeys( [] );
		} catch ( error ) {
			bulkDeleteFormError( error );
		}
	}

	// handle bulk action more button
	function handleMoreBulkAction() {
		setMoreBulkActionOpen( ! isMoreBulkActionOpen );
	}
	// Close Dropdown click on outside
	useEffect( () => {
		checkClickedOutside(
			isMoreBulkActionOpen,
			setMoreBulkActionOpen,
			moreBulkActionRef
		);
	}, [ isMoreBulkActionOpen ] );

	function handleDeleteModalAlert() {
		setDeleteModalOpen( ! isDeleteModalOpen );
	}

	function handleCancelDeleteAlert() {
		setDeleteModalOpen( false );
	}

	return (
		<TablkSelectionStyle className="formgent-bulk-selection">
			<div className="formgent-bulk-selection__checkbox">
				<AntCheckbox
					onChange={ handleBulkSelection }
					checked={ selectedRowKeys.length === data.length }
				></AntCheckbox>
			</div>
			<div className="formgent-form-bulk-action__more">
				<AntButton
					size="small"
					className="formgent-btn-bulk-status"
					onClick={ handleMoreBulkAction }
				>
					<ReactSVG src={ toggleIcon } />{ ' ' }
					{ __( 'Status', 'formgent' ) }
				</AntButton>
				{ isMoreBulkActionOpen && (
					<ul
						className="formgent-form-bulk-action__dropdown"
						ref={ moreBulkActionRef }
					>
						<li>
							<a
								href=""
								onClick={ ( e ) => {
									e.preventDefault();
									handleBulkStatusUpdate( 'publish' );
								} }
							>
								{ __( 'Activate', 'formgent' ) }
							</a>
						</li>
						<li>
							<a
								href=""
								onClick={ ( e ) => {
									e.preventDefault();
									handleBulkStatusUpdate( 'draft' );
								} }
							>
								{ __( 'Deactivate', 'formgent' ) }
							</a>
						</li>
					</ul>
				) }
			</div>
			<AntButton
				size="small"
				className="formgent-btn-bulk-delete"
				onClick={ handleDeleteModalAlert }
			>
				<ReactSVG src={ trashIcon } />
				{ __( 'Delete', 'formgent' ) }
			</AntButton>
			<span className="formgent-bulk-selection__text">
				<strong>{ selectedRowKeys.length }</strong>{ ' ' }
				{ __( 'Forms Selected', 'formgent' ) }
			</span>
			<a className="formgent-clear-bulk" onClick={ handleClearSelection }>
				{ __( 'Clear Selection', 'formgent' ) }
			</a>

			{ isDeleteModalOpen && (
				<PopUp
					title={
						<>
							<span className="formgent-popup-title-icon">
								<ReactSVG src={ trashAlt } />
							</span>
							{ __( 'Delete Form', 'formgent' ) }
						</>
					}
					onCancel={ handleCancelDeleteAlert }
					onSubmit={ handleBulkDelete }
					hasCancelButton
					hasSubmitButton
					isActiveSubmit
					submitText={
						isFormDeleting
							? __( 'Deleting', 'formgent' )
							: __( 'Delete', 'formgent' )
					}
					className="formgent-form-delete-alert"
				>
					<FormDeleteAlert
						// error={ formDeletionError }
						formTitle={ selectedForms }
					/>
				</PopUp>
			) }
		</TablkSelectionStyle>
	);
}
