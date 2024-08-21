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

const controls = {
	general: {
		type: 'panel',
		label: __( 'General', 'formgent' ),
		children: {
			name: {
				type: 'text',
				label: __( 'Field Name', 'formgent' ),
			},
		},
	},
};

registerBlock( metadata, controls, Edit, 'smiley', exampleAttributes, {
	save: Save,
} );
