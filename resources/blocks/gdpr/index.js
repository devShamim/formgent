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
import ReactSVG from 'react-inlinesvg';
import gdprIcon from '@icon/block-icons/gdpr.svg';

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
	<ReactSVG src={ gdprIcon } />,
	exampleAttributes
);
