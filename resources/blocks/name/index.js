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
import ReactSVG from 'react-inlinesvg';
import nameIcon from '@icon/block-icons/name.svg';

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

registerBlock(
	metadata,
	controls,
	Edit,
	<ReactSVG src={ nameIcon } />,
	exampleAttributes,
	{
		save: Save,
	}
);
