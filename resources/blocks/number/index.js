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

const controls = {
	basic_info: {
		type: 'panel',
		label: __( 'General', 'formgent' ),
		children: {
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
			format: {
				type: 'select',
				label: __( 'Number Format', 'formgent' ),
				options: [
					{
						label: __( 'None', 'formgent' ),
						value: 'none',
					},
					{
						label: __( 'Decimal (Ex: 364.54)', 'formgent' ),
						value: 'decimal',
					},
					{
						label: __( 'Non Decimal (Ex: 364)', 'formgent' ),
						value: 'non_decimal',
					},
				],
			},
			value: {
				type: 'default_value',
				label: __( 'Default Value', 'formgent' ),
			},
		},
	},
};

registerBlock( metadata, controls, Edit, 'smiley', exampleAttributes );
