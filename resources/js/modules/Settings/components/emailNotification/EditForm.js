import { __ } from '@wordpress/i18n';
import ReactSVG from 'react-inlinesvg';
import { useEffect } from '@wordpress/element';
import { doAction } from '@wordpress/hooks';
import { Space, Form, Input, Col, Row } from 'antd';

import arrowLeftIcon from '@icon/arrow-left.svg';

import { AntButton, ClassicEditorField } from '@formgent/components';

export default function EditForm( props ) {
	const {
		isEdit,
		initialValues,
		isProcessing,
		responseStatus,
		placeholders,
		onSubmit,
		onCancel,
	} = props;

	const [ form ] = Form.useForm();

	const commonFieldRules = [
		{
			required: true,
			message: __( 'The field is required', 'formgent' ),
		},
	];

	useEffect( () => {
		if ( ! responseStatus ) {
			return;
		}

		doAction( 'formgent-toast', {
			message: responseStatus.message,
			type: responseStatus.success ? 'success' : 'error',
		} );
	}, [ responseStatus ] );

	function submit( values ) {
		if ( isProcessing ) {
			return;
		}

		if ( typeof onSubmit === 'function' ) {
			onSubmit( values );
		}
	}

	return (
		<div>
			<Form
				layout="vertical"
				form={ form }
				initialValues={ initialValues }
				onFinish={ submit }
			>
				<Space
					direction="vertical"
					size={ 50 }
					style={ { display: 'flex' } }
				>
					<Row align={ 'middle' }>
						<Col flex={ 'auto' }>
							{ typeof onCancel === 'function' && (
								<AntButton
									disabled={ isProcessing }
									onClick={ onCancel }
								>
									<ReactSVG src={ arrowLeftIcon } />{ ' ' }
									{ __( 'Back', 'formgent' ) }
								</AntButton>
							) }
						</Col>
						<Col>
							{ typeof onSubmit === 'function' && (
								<AntButton
									type="primary"
									className="formgent-page-header-btn"
									disabled={ isProcessing }
									htmlType="submit"
								>
									{ isProcessing && (
										<span
											style={ { width: '15px' } }
											className="formgent-loading formgent-loading-light"
										></span>
									) }

									{ isEdit
										? __( 'Update', 'formgent' )
										: __( 'Submit', 'formgent' ) }
								</AntButton>
							) }
						</Col>
					</Row>

					<div className="formgent-form-fields">
						<Row justify="center">
							<Col xs={ 24 } sm={ 24 } md={ 24 } xl={ 12 }>
								<Form.Item
									name="name"
									label={ __( 'Template Name', 'formgent' ) }
									rules={ commonFieldRules }
								>
									<Input
										placeholder={ __(
											'Template Name',
											'formgent'
										) }
									/>
								</Form.Item>

								<Form.Item
									name="subject"
									label={ __( 'Email Subject', 'formgent' ) }
									rules={ commonFieldRules }
								>
									<Input
										placeholder={ __(
											'Template Name',
											'formgent'
										) }
									/>
								</Form.Item>

								<Form.Item
									name="send_to"
									label={ __( 'Send to', 'formgent' ) }
									rules={ commonFieldRules }
								>
									<Input
										placeholder={ __(
											'Template Name',
											'formgent'
										) }
									/>
								</Form.Item>

								<Form.Item
									name="body"
									label={ __( 'Email Content', 'formgent' ) }
									rules={ commonFieldRules }
								>
									<ClassicEditorField />
								</Form.Item>
							</Col>
						</Row>
					</div>
				</Space>
			</Form>
		</div>
	);
}