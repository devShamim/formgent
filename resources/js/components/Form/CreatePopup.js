import { Fragment } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import { Modal } from '@wordpress/components';
import { CreatePopupStyle } from './style.js';
import { __ } from '@wordpress/i18n';
import ReactSVG from 'react-inlinesvg';
import arrowLeft from '@icon/arrow-small-left.svg';
import Pencil from '@icon/pencil-plus.svg';
import CreatePopupAction from './CreatePopupAction.js';
import CreatePopupHeader from './CreatePopupHeader.js';
import CreatePopupFormType from './CreatePopupFormType.js';
import formgentLogo from '@icon/formgent-logo.svg';

function CreatePopup( props ) {
	const { FormReducer } = useSelect( ( select ) => {
		return select( 'formgent' ).getForms();
	}, [] );
	const { SingleFormReducer } = useSelect( ( select ) => {
		return select( 'formgent' ).getSingleFormState();
	}, [] );
	const { updateFormState, updateCreatePopupStage, updateCreatePopupStep } =
		useDispatch( 'formgent' );
	const {
		isImportingAttachment,
		isCreatePopupOpen,
		createFormStage,
		createPopupStep,
	} = FormReducer;

	const actionData = [
		{
			type: 'scratch',
			icon: Pencil,
			label: __( 'Start from Scratch', 'formgent' ),
			text: __( 'Start with a blank form', 'formgent' ),
			step: '1',
		},
		{
			type: 'general',
			icon: Pencil,
			label: __( 'Classic Form', 'formgent' ),
			text: __( 'Show multiple questions on single page', 'formgent' ),
			url: `forms/form-new/${ SingleFormReducer?.selectedFormType }`,
			step: '2',
		},
	];

	function handlePopupCloseRequest() {
		updateFormState( {
			createFormStage: 'initial',
			addBackBtn: false,
			isCreatePopupOpen: false,
		} );
	}

	function handleFormBack() {
		updateCreatePopupStep( '1' );
		updateCreatePopupStage( 'initial' );
	}

	return (
		isCreatePopupOpen && (
			<Fragment>
				<Modal
					overlayClassName={ `formgent-modal formgent-create-modal-wrap ${
						isImportingAttachment
							? 'formgent-attachment-importing'
							: ''
					}` }
					shouldCloseOnClickOutside={ ! isImportingAttachment }
					onRequestClose={ () =>
						isImportingAttachment ? {} : handlePopupCloseRequest()
					}
					isDismissible={ ! isImportingAttachment }
					// headerActions={
					// 	<span className="formgent-create-modal-logo">
					// 		<ReactSVG src={ formgentLogo } />
					// 	</span>
					// }
				>
					<CreatePopupStyle
						className={ `formgent-create-form-modal ${
							createFormStage === 'prepared-elements'
								? 'formgent-create-loader-active'
								: ''
						}` }
					>
						<CreatePopupHeader
							title={ __( 'Create a New Form', 'formgent' ) }
							step={ createPopupStep }
						/>
						<CreatePopupFormType />
						{ actionData.map( ( item, index ) => {
							if ( createPopupStep === item.step ) {
								return (
									<CreatePopupAction
										item={ item }
										setStep={ updateCreatePopupStep }
										key={ index }
									/>
								);
							}
						} ) }

						{ createFormStage === 'scratch' && (
							<span
								className="formgent-btn-back"
								onClick={ handleFormBack }
							>
								<ReactSVG src={ arrowLeft } />{ ' ' }
								{ __( 'Back', 'formgent' ) }
							</span>
						) }
					</CreatePopupStyle>
				</Modal>
			</Fragment>
		)
	);
}

export default CreatePopup;
