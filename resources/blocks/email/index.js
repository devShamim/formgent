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

const exampleAttributes = {};

const generalControls = {
	basic_info: {
		type: 'panel',
		children: {
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
			placeholder: {
				type: 'text',
				label: __( 'Field Placeholder', 'formgent' ),
			},
			show_field_icon: {
				type: 'switch',
				label: __( 'Show Email Icon', 'formgent' ),
			},
			enable_confirmation_field: {
				type: 'switch',
				label: __( 'Enable Confirmation Field', 'formgent' ),
			},
			confirm_placeholder: {
				type: 'text',
				label: __( 'Confirm Field Placeholder', 'formgent' ),
				condition: ( attributes ) => {
					return attributes.enable_confirmation_field;
				},
			},
			confirmation_field_gap: {
				type: 'height',
				label: __( 'Confirmation Field Gap', 'formgent' ),
				condition: ( attributes ) => {
					return attributes.enable_confirmation_field;
				},
			},
			required: {
				type: 'switch',
				label: __( 'Required', 'formgent' ),
			},
		},
	},
};

const advancedControls = {
	advanced: {
		type: 'panel',
		children: {
			value: {
				type: 'default_value',
				label: __( 'Default Value', 'formgent' ),
			},
			name: {
				type: 'text',
				label: __( 'Field Name', 'formgent' ),
			},
		},
	},
};

const controls = { generalControls, advancedControls };

registerBlock( metadata, controls, Edit, 'smiley', exampleAttributes );
