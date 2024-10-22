import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import ReactSVG from 'react-inlinesvg';
import editIcon from '@icon/edit.svg';
import copyIcon from '@icon/copy.svg';
import trashIcon from '@icon/trash.svg';
import trashAlt from '@icon/trash-alt.svg';
import PopUp from '@formgent/components/PopUp';
import DeleteAlert from './DeleteAlert';

export default function DataItemAction( props ) {
	const {
		id,
		name,
		isDuplicating,
		deleteErrorMessage,
		isDeleting,
		onDuplicate,
		onDelete,
		Link,
	} = props;

	const [ state, setState ] = useState( {
		showDeletePopup: false,
	} );

	return (
		<div>
			<Link
				to={ `/email-notifications/edit/${ id }` }
				className="formgent-action-link"
			>
				<span className="formgent-action-link-icon">
					<ReactSVG src={ editIcon } />
				</span>
			</Link>

			<a
				href="#"
				onClick={ ( e ) => {
					e.preventDefault();

					if ( typeof onDuplicate !== 'function' ) {
						return;
					}

					if ( isDuplicating ) {
						return;
					}

					onDuplicate( id );
				} }
				className="formgent-action-link"
			>
				<span className="formgent-action-link-icon">
					<ReactSVG src={ copyIcon } />
				</span>
			</a>

			<a
				href="#"
				onClick={ ( e ) => {
					e.preventDefault();

					if ( typeof onDelete !== 'function' ) {
						return;
					}

					setState( { ...state, showDeletePopup: true } );
				} }
				className="formgent-action-link"
			>
				<span className="formgent-action-link-icon">
					<ReactSVG src={ trashIcon } />
				</span>
			</a>

			{ state.showDeletePopup && (
				<PopUp
					title={
						<>
							<span className="formgent-popup-title-icon">
								<ReactSVG src={ trashAlt } />
							</span>
							{ __( 'Delete Notification', 'formgent' ) }
						</>
					}
					onSubmit={ () => {
						if ( typeof onDelete !== 'function' ) {
							return;
						}

						onDelete( id );
					} }
					onCancel={ () => {
						setState( { ...state, showDeletePopup: false } );
					} }
					submitText={
						isDeleting
							? __( 'Deleting', 'formgent' )
							: __( 'Delete', 'formgent' )
					}
					hasCancelButton
					hasSubmitButton
					isActiveSubmit
					className="formgent-settings-delete-alert"
				>
					<DeleteAlert
						errorMessage={ deleteErrorMessage }
						title={ name }
					/>
				</PopUp>
			) }
		</div>
	);
}
