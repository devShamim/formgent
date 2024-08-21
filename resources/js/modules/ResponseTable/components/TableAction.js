import AntDropdown from '@formgent/components/Dropdown';
import AntModal from '@formgent/components/Modal';
import deleteData from '@formgent/helper/deleteData';
import ellipsisV from '@icon/ellipsis-v.svg';
import penNib from '@icon/pen-nib.svg';
import trash from '@icon/trash.svg';
import { useDispatch, useSelect } from '@wordpress/data';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import ReactSVG from 'react-inlinesvg';
import FormDeleteAlert from './FormDeleteAlert';
export default function TableAction( props ) {
	const [ isActivateFormDeleteModal, setIsActivateFormDeleteModal ] =
		useState( false );
	const { type, responseData } = props;

	const { FormReducer } = useSelect( ( select ) => {
		return select( 'formgent' ).getForms();
	}, [] );

	const { isFormDeleting } = FormReducer;

	const { deleteFormRequest, deleteFormSuccess, deleteFormError } =
		useDispatch( 'formgent' );

	function handleActivateEditor( e ) {
		e.preventDefault();
		const editableResponseData = {
			id: responseData.id,
			title: responseData.title,
		};
	}

	function handleActivateDeleteFormModal() {
		setIsActivateFormDeleteModal( true );
	}

	const actionsItems = [
		{
			key: '1',
			label: (
				<a onClick={ handleActivateEditor }>
					<ReactSVG src={ penNib } /> { __( 'Edit', 'formgent' ) }
				</a>
			),
		},
		{
			type: 'divider',
		},
		{
			key: '3',
			label: (
				<a onClick={ handleActivateDeleteFormModal }>
					<ReactSVG src={ trash } width="16" height="16" />{ ' ' }
					{ __( 'Delete', 'formgent' ) }
				</a>
			),
		},
	];

	function handleSortby( key ) {
		console.log( 'Handle Sortby Clicked', key );
	}

	const sortbyItems = [
		{
			key: 'name',
			label: <a onClick={ () => handleSortby( 'name' ) }>Sortby Name</a>,
		},
		{
			type: 'divider',
		},
		{
			key: 'type',
			label: <a onClick={ () => handleSortby( 'type' ) }>Sortby Type</a>,
		},
	];

	function handleCancelDeleteAlert() {
		setIsActivateFormDeleteModal( false );
	}

	async function handleDeleteForm() {
		if ( isFormDeleting ) return;
		deleteFormRequest();
		try {
			// Delete responseData (Need to delete responseTable data)
			const formDeleteResponse = await deleteData(
				`admin/forms/${ responseData.id }`
			);
			deleteFormSuccess( responseData.id );
			setIsActivateFormDeleteModal( false );
		} catch ( error ) {
			deleteFormError( error );
		}
	}

	return (
		<div className="formgent-table-action">
			<AntDropdown
				menu={ {
					items: type === 'sortby' ? sortbyItems : actionsItems,
				} }
				trigger={ [ 'click' ] }
				placement="bottomRight"
				overlayStyle={ { minWidth: '240px' } }
			>
				<a onClick={ ( e ) => e.preventDefault() }>
					<ReactSVG src={ ellipsisV } width="20" height="20" />
				</a>
			</AntDropdown>
			{ isActivateFormDeleteModal && (
				<AntModal
					open={ isActivateFormDeleteModal }
					title={ __( 'Delete responseData', 'formgent' ) }
					onCancel={ handleCancelDeleteAlert }
					onOk={ handleDeleteForm }
					submitText={
						isFormDeleting
							? __( 'Deleting', 'formgent' )
							: __( 'Delete', 'formgent' )
					}
					className="formgent-form-delete-alert"
				>
					<FormDeleteAlert
						// error={ formDeletionError }
						formTitle={ responseData.title }
					/>
				</AntModal>
			) }
		</div>
	);
}
