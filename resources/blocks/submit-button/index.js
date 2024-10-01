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
						label: __( 'Middle', 'formgent' ),
						value: 'middle',
					},
					{
						label: __( 'Block', 'formgent' ),
						value: 'block',
					},
				],
			},
			button_style: {
				type: 'select',
				label: __( 'Button Style', 'formgent' ),
				options: [
					{
						label: __( 'Default Style', 'formgent' ),
						value: 'default',
					},
					{
						label: __( 'Solid', 'formgent' ),
						value: 'solid',
					},
					{
						label: __( 'Bordered', 'formgent' ),
						value: 'bordered',
					},
				],
			},
			background_color: {
				type: 'color',
				label: __( 'Background Color', 'formgent' ),
				color: '#4cafaa',
				condition: ( attributes ) => {
					return attributes.button_style === 'solid';
				},
			},
			border_color: {
				type: 'color',
				label: __( 'Border Color', 'formgent' ),
				color: '#000000',
				condition: ( attributes ) => {
					return attributes.button_style === 'bordered';
				},
			},
			text_color: {
				type: 'color',
				label: __( 'Text Color', 'formgent' ),
				color: '#000000',
				condition: ( attributes ) => {
					return attributes.button_style !== 'default';
				},
			},
		},
	},
};

const advancedControls = {};

const controls = { generalControls, advancedControls };

registerBlock( metadata, controls, Edit, 'smiley', exampleAttributes );
