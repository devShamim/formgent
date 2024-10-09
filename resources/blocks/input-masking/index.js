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

const exampleAttributes = {
	content: 'Sample content for preview',
};

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
			mask_type: {
				type: 'select',
				label: __( 'Mask Type', 'formgent' ),
				options: [
					{
						label: __( 'None', 'formgent' ),
						value: 'none',
					},
					{
						label: __( '(###) ###-####', 'formgent' ),
						value: '(000) 000-0000',
					},
					{
						label: __( '(##) ####-####', 'formgent' ),
						value: '(00) 0000-0000',
					},
					{
						label: __( '26/09/2024', 'formgent' ),
						value: '00/00/0000',
					},
					{
						label: __( '23:59:59', 'formgent' ),
						value: '00:00:00',
					},
					{
						label: __( '23/09/2024 23:59:59', 'formgent' ),
						value: '00/00/0000 00:00:00',
					},
				],
			},
			placeholder: {
				type: 'text',
				label: __( 'Field Placeholder', 'formgent' ),
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
