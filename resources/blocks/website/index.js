/**
 * Internal dependencies
 */
import { __ } from '@wordpress/i18n';

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
			placeholder: {
				type: 'text',
				label: __( 'Field Placeholder', 'formgent' ),
			},
			name: {
				type: 'text',
				label: __( 'Field Name', 'formgent' ),
			},
			value: {
				type: 'default_value',
				label: __( 'Default Value', 'formgent' ),
			},
		},
	},
};

registerBlock( metadata, controls, Edit, 'smiley', exampleAttributes );
