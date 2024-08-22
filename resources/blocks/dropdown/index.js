/**
 * wordpress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { registerBlock } from '@formgent/modules';
import Edit from './Edit';
import metadata from './block.json';
import './style.scss';
import { onChangeChoiceOptions } from '../utils';

const exampleAttributes = {};

const controls = {
	general: {
		type: 'panel',
		label: __( 'General', 'formgent' ),
		children: {
			label: {
				type: 'text',
				label: __( 'Label', 'formgent' ),
			},
			sub_label: {
				type: 'text',
				label: __( 'Sub Label', 'formgent' ),
			},
			required: {
				type: 'switch',
				label: __( 'Required', 'formgent' ),
			},
			label_alignment: {
				type: 'toggle_group',
				label: __( 'Label Alignment', 'formgent' ),
				options: [
					{
						label: __( 'Left', 'formgent' ),
						value: 'left',
					},
					{
						label: __( 'Right', 'formgent' ),
						value: 'right',
					},
					{
						label: __( 'Top', 'formgent' ),
						value: 'top',
					},
					{
						label: __( 'Justify', 'formgent' ),
						value: 'justify',
					},
				],
			},
			name: {
				type: 'text',
				label: __( 'Field Name', 'formgent' ),
			},
			options: {
				type: 'repeater',
				label: __( 'Dropdown Items', 'formgent' ),
				label_key: 'label',
				add_button_text: 'Add Item',
				onChange: onChangeChoiceOptions,
				fields: {
					label: {
						type: 'text',
						label: __( 'Label', 'formgent' ),
					},
				},
			},
			value: {
				type: 'default_value',
				label: __( 'Default Value', 'formgent' ),
			},
		},
	},
	advanced: {
		type: 'panel',
		label: __( 'FormGent Advanced', 'formgent' ),
		children: {
			options: {
				type: 'repeater',
				label: __( 'Values', 'formgent' ),
				label_key: 'label',
				show_actions: false,
				onChange: onChangeChoiceOptions,
				fields: {
					value: {
						type: 'text',
						label: __( 'Value', 'formgent' ),
					},
				},
			},
		},
	},
};

registerBlock( metadata, controls, Edit, 'smiley', exampleAttributes );
