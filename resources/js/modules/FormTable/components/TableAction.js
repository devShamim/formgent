import AntDropdown from '@formgent/components/Dropdown';
import PopUp from '@formgent/components/PopUp';
import deleteData from '@formgent/helper/deleteData';
import postData from '@formgent/helper/postData';
import ellipsisH from '@icon/ellipsis-h.svg';
import penNib from '@icon/pen-nib.svg';
import trash from '@icon/trash.svg';
import trashAlt from '@icon/trash-alt.svg';
import copyIcon from '@icon/copy.svg';
import spinnerIcon from '@icon/spinner.svg';
import { useDispatch, resolveSelect } from '@wordpress/data';
import { useState } from '@wordpress/element';
import { applyFilters, doAction } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';
import ReactSVG from 'react-inlinesvg';
import FormDeleteAlert from './FormDeleteAlert';

export default function TableAction( props ) {
	const [ isActivateFormDeleteModal, setIsActivateFormDeleteModal ] =
		useState( false );
	const {
		form,
		editableForm,
		setEditableForm,
		isFormDeleting,
		isFormDuplicating,
		pagination,
	} = props;

	const {
		deleteFormRequest,
		deleteFormSuccess,
		deleteFormError,
		duplicateFormRequest,
		duplicateFormSuccess,
		duplicateFormError,
	} = useDispatch( 'formgent' );

	function handleActivateEditor( e ) {
		e.preventDefault();
		const editableForm = {
			id: form.id,
			title: form.title,
		};
		setEditableForm( editableForm );
	}

	function handleActivateDeleteFormModal() {
		setIsActivateFormDeleteModal( true );
	}

	const items = applyFilters( 'formgent_form_table_action', [
		{
			key: '1',
			label: (
				<a
					onClick={ handleActivateEditor }
					className="dropdown-header-content"
				>
					<ReactSVG src={ penNib } width="16" height="16" />{ ' ' }
					{ __( 'Rename', 'formgent' ) }
				</a>
			),
		},
		{
			key: '2',
			label: (
				<a
					onClick={ handleFormDuplicate }
					className="dropdown-header-content"
				>
					{ isFormDuplicating ? (
						<ReactSVG src={ spinnerIcon } width="16" height="16" />
					) : (
						<ReactSVG src={ copyIcon } width="16" height="16" />
					) }{ ' ' }
					{ __( 'Duplicate', 'formgent' ) }
				</a>
			),
		},
		{
			type: 'divider',
		},
		{
			key: '3',
			label: (
				<a
					onClick={ handleActivateDeleteFormModal }
					className="dropdown-header-content"
				>
					<ReactSVG src={ trash } width="16" height="16" />{ ' ' }
					{ __( 'Delete', 'formgent' ) }
				</a>
			),
		},
	] );

	function handleCancelDeleteAlert() {
		setIsActivateFormDeleteModal( false );
	}

	async function handleDeleteForm() {
		if ( isFormDeleting ) return;
		deleteFormRequest();
		try {
			const formDeleteResponse = await deleteData(
				`admin/forms/${ form.id }`
			);
			deleteFormSuccess( form.id );
			setIsActivateFormDeleteModal( false );
		} catch ( error ) {
			deleteFormError( error );
		}
	}

	async function handleFormDuplicate() {
		if ( isFormDuplicating ) return;

		duplicateFormRequest();
		try {
			const formDuplicateResponse = await postData(
				`admin/forms/${ form.id }/duplicate`
			);

			duplicateFormSuccess( form.id );
			doAction( 'formgent-toast', {
				message: formDuplicateResponse.message,
			} );

			resolveSelect( 'formgent' ).getForms(
				pagination.current_page,
				pagination.per_page,
				Date.now()
			);
		} catch ( error ) {
			duplicateFormError( error );
			console.log( error );
		}
	}

	return (
		<div
			className="formgent-table-action"
			data-tooltip={ __( 'Rename, Duplicate & Delete', 'formgent' ) }
		>
			<AntDropdown
				menu={ { items } }
				trigger={ [ 'click' ] }
				placement="bottomRight"
				overlayStyle={ { minWidth: '240px' } }
				overlayClassName="formgent-table-action__dropdown"
			>
				<a onClick={ ( e ) => e.preventDefault() }>
					<ReactSVG src={ ellipsisH } width="20" height="20" />
				</a>
			</AntDropdown>
			{ isActivateFormDeleteModal && (
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
					onSubmit={ handleDeleteForm }
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
						formTitle={ form.title }
					/>
				</PopUp>
			) }
		</div>
	);
}
