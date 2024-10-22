import { __ } from '@wordpress/i18n';
import ReactSVG from 'react-inlinesvg';
import { Form } from 'antd';
import AntInput from '@formgent/components/Input';
import linkIcon from '@icon/link.svg';
import chevronDownIcon from '@icon/chevron-down.svg';
import PresetDropdown from './PresetDropdown';

export default function TextField( props ) {
	const {
		value,
		onChange,
		presetFields,
		presetButtonLabel,
		dropdownClassName,
	} = props;
	const { status } = Form.Item.useStatus();

	const hasPresetFields = presetFields && presetFields.length ? true : false;

	return (
		<div
			className={ `formgent-form-input formgent-input-status-${ status }${
				hasPresetFields ? ' formgent-has-input-addon-end' : ''
			}` }
		>
			<AntInput { ...props } />

			{ hasPresetFields && (
				<div className="formgent-input-addon formgent-input-addon-end">
					<PresetDropdown
						items={ presetFields }
						value={ value }
						onChange={ onChange }
						dropdownClassName={ dropdownClassName }
					>
						<a
							className="formgent-link"
							onClick={ ( e ) => e.preventDefault() }
						>
							<div className="formgent-space formgent-space-align-center">
								<span className="formgent-icon">
									<ReactSVG src={ linkIcon } />
								</span>
								<span>
									{ presetButtonLabel
										? presetButtonLabel
										: __( 'Preset Fields', 'formgent' ) }
								</span>
								<span className="formgent-icon">
									<ReactSVG src={ chevronDownIcon } />
								</span>
							</div>
						</a>
					</PresetDropdown>
				</div>
			) }
		</div>
	);
}
