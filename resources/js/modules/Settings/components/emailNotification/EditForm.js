import { __ } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element';
import { doAction } from '@wordpress/hooks';
import { Space, Form, Col, Row } from 'antd';
import {
	AntButton,
	ClassicEditorField,
	TextField,
	AntInput,
} from '@formgent/components';
import ReactSVG from 'react-inlinesvg';
import arrowLeftIcon from '@icon/arrow-left.svg';

export default function EditForm( props ) {
	const {
		isEdit,
		initialValues,
		isProcessing,
		responseStatus,
		presetFields,
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

	const presetButtonLabel = __( 'Form Fields', 'formgent' );
	const parsedPresetFields = parsePresetFields( presetFields );

	function parsePresetFields( presetFields ) {
		return presetFields.map( ( item, index ) => ( {
			...item,
			label: item.value,
			key: item.value,
		} ) );
	}

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
									className="formgent-settings-back-btn"
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

					<div className="formgent-settings-form-fields">
						<Row justify="center">
							<Col xs={ 24 } sm={ 24 } md={ 24 } xl={ 12 }>
								<Form.Item
									name="name"
									label={ __( 'Template Name', 'formgent' ) }
									rules={ commonFieldRules }
								>
									<AntInput
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
									<TextField
										presetButtonLabel={ presetButtonLabel }
										presetFields={ parsedPresetFields }
										placeholder={ __(
											'Email Subject',
											'formgent'
										) }
										dropdownClassName="formgent-preset-field-dropdown"
									/>
								</Form.Item>

								<Form.Item
									name="send_to"
									label={ __( 'Send to', 'formgent' ) }
									rules={ commonFieldRules }
								>
									<TextField
										presetButtonLabel={ presetButtonLabel }
										presetFields={ parsedPresetFields }
										placeholder={ __(
											'Send to',
											'formgent'
										) }
										dropdownClassName="formgent-preset-field-dropdown"
									/>
								</Form.Item>

								<Form.Item
									name="body"
									label={ __( 'Email Content', 'formgent' ) }
									rules={ commonFieldRules }
								>
									<ClassicEditorField
										presetButtonLabel={ presetButtonLabel }
										presetFields={ parsedPresetFields }
										dropdownClassName="formgent-preset-field-dropdown"
									/>
								</Form.Item>
							</Col>
						</Row>
					</div>
				</Space>
			</Form>
		</div>
	);
}
