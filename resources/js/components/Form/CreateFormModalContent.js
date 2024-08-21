import { useEffect } from '@wordpress/element';
import { useDispatch, useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { CreateFormStyle } from './style.js';
import { Form } from 'antd';
import AntInput from '@formgent/components/Input';
import AntButton from '@formgent/components/Button';
import handleCreateForm from '@formgent/helper/handleCreateForm';

export default function CreateFormModalContent( { type } ) {
	const { CommonReducer } = useSelect( ( select ) => {
		return select( 'formgent' ).getCommonState();
	}, [] );
	const { useNavigate, useParams } = CommonReducer.routerComponents;
	const navigate = useNavigate();
	const { id } = useParams();

	const { SingleFormReducer } = useSelect( ( select ) => {
		return select( 'formgent' ).getSingleFormState( id );
	}, [] );

	const {
		createFormRequest,
		createFormSuccess,
		createFormError,
		updateForms,
		updateCreatePopUp,
	} = useDispatch( 'formgent' );

	function handleFormSubmission( formData ) {
		if ( SingleFormReducer?.isCreatingForm ) return;

		const newForm = {
			status: 'draft',
			type: type,
		};

		Object.assign( formData, newForm );
		createFormRequest();
		handleCreateForm(
			formData,
			createFormSuccess,
			createFormError,
			updateForms,
			updateCreatePopUp,
			navigate
		);
	}

	useEffect( () => {
		const titleInput = document.getElementById(
			'formgent-create-form-title'
		);
		titleInput && titleInput.select();
		titleInput &&
			titleInput.focus( {
				cursor: 'all',
			} );
	}, [] );

	return (
		<CreateFormStyle className="formgent-create-modal">
			<h2 className="formgent-create-modal-title">
				{ __( "Let's get started", 'formgent' ) }
			</h2>
			<p className="formgent-create-modal-subtitle">
				{ __(
					'Please enter a name for your form. You can edit it later.',
					'formgent'
				) }
			</p>
			<div className="formgent-create-modal__content">
				<Form
					name="formgent-create-form"
					layout="vertical"
					onFinish={ handleFormSubmission }
				>
					<Form.Item
						label={ __( 'Form name', 'formgent' ) }
						name="title"
						rules={ [
							{
								min: 5,
								message: __(
									'The title field must be at least 5 characters.',
									'formgent'
								),
							},
							{
								whitespace: true,
								message: __(
									'Only spaces are not allowed',
									'formgent'
								),
							},
							{
								required: true,
								message: __(
									'The title field is required',
									'formgent'
								),
							},
						] }
						initialValue={ __( 'My form', 'formgent' ) }
					>
						<AntInput
							size="large"
							value={ __( 'My form', 'formgent' ) }
							id="formgent-create-form-title"
						/>
					</Form.Item>
					<Form.Item>
						<AntButton type="primary" htmlType="submit" block>
							{ SingleFormReducer?.isCreatingForm
								? __( 'Creating', 'formgent' )
								: __( 'Create Form', 'formgent' ) }
						</AntButton>
					</Form.Item>
				</Form>
			</div>
		</CreateFormStyle>
	);
}
