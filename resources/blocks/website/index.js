/**
 * Internal dependencies
 */
import { __ } from '@wordpress/i18n';

import { registerBlock } from '@formgent/modules';
import Edit from './Edit';
import metadata from './block.json';
import './style.scss';
import ReactSVG from 'react-inlinesvg';
import websiteIcon from '@icon/block-icons/website.svg';

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
			validation: {
				type: 'switch',
				label: __( 'Validate URL', 'formgent' ),
			},
			validation_message: {
				type: 'text',
				label: __( 'Validation message', 'formgent' ),
				condition: function ( attributes ) {
					return attributes[ 'validation' ];
				},
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

registerBlock(
	metadata,
	controls,
	Edit,
	<ReactSVG src={ websiteIcon } />,
	exampleAttributes
);
