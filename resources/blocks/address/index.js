/**
 * wordpress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { registerBlock } from '@formgent/modules';
import Edit from './Edit';
import Save from './Save';
import metadata from './block.json';
import './style.scss';

const exampleAttributes = {};

const generalControls = {
	general: {
		type: 'panel',
		children: {
			name: {
				type: 'text',
				label: __( 'Field Name', 'formgent' ),
			},
		},
	},
};

const advancedControls = {};

const controls = { generalControls, advancedControls };

registerBlock( metadata, controls, Edit, 'smiley', exampleAttributes, {
	save: Save,
} );
