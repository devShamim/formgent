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
				label: __( 'Multi Choice Items', 'formgent' ),
				label_key: 'title',
				add_button_text: 'Add Items',
				fields: {
					title: {
						type: 'text',
						label: __( 'Title', 'formgent' ),
					},
					value: {
						type: 'text',
						label: __( 'Value', 'formgent' ),
					},
				},
			},
			value: {
				type: 'default_value',
				label: __( 'Default Value', 'formgent' ),
			},
		},
	},
};

registerBlock( metadata, controls, Edit, 'smiley', exampleAttributes );
