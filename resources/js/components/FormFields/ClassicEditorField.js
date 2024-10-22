import { useRef, useEffect } from '@wordpress/element';
import ClassicEditor from '@wpmvc/classic-editor';
import PresetDropdown from './PresetDropdown';
import { Form, Button } from 'antd';

const PresetButton = ( props ) => {
	const { buttonLabel, onInsert, items, dropdownClassName } = props;

	return (
		<PresetDropdown
			items={ items }
			onInsert={ onInsert }
			dropdownClassName={ dropdownClassName }
		>
			<Button type="primary">
				{ buttonLabel
					? buttonLabel
					: __( 'Preset Fields', 'formgent' ) }
			</Button>
		</PresetDropdown>
	);
};

export default function ClassicEditorField( props ) {
	const {
		value,
		onChange,
		presetFields,
		presetButtonLabel,
		dropdownClassName,
	} = props;
	const { status } = Form.Item.useStatus();

	const hasPresetFields = presetFields && presetFields.length ? true : false;

	const editorRef = useRef();
	const presetFieldRef = useRef();

	useEffect( () => {
		if ( hasPresetFields && presetFieldRef.current ) {
			const editorTabs =
				editorRef.current.querySelector( '.wp-editor-tabs' );
			editorTabs.append( presetFieldRef.current );
		}
	}, [ hasPresetFields ] );

	return (
		<div
			className={ `formgent-form-input formgent-form-input-${ status }` }
		>
			<div ref={ editorRef }>
				{ hasPresetFields && (
					<div
						style={ { display: 'inline-block' } }
						ref={ presetFieldRef }
					>
						<PresetButton
							parentRef={ editorRef }
							buttonLabel={ presetButtonLabel }
							value={ value }
							onInsert={ ( preset ) => {
								if ( typeof onChange === 'function' ) {
									onChange(
										`${ value ? value : '' }${ preset }`
									);
								}
							} }
							items={ presetFields }
							dropdownClassName={ dropdownClassName }
						/>
					</div>
				) }

				<ClassicEditor
					{ ...props }
					height={ 300 }
					hasMedia={ true }
					useExtendStyles={ true }
				/>
			</div>
		</div>
	);
}
