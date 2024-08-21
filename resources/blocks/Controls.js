import {
	CheckboxControl,
	PanelBody,
	SelectControl,
	ToggleControl,
	__experimentalInputControl as InputControl,
	__experimentalBoxControl as BoxControl,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from '@wordpress/components';
import { useMemo, useState } from '@wordpress/element';
import { applyFilters } from '@wordpress/hooks';
import styled, { css } from 'styled-components';
import Repeater from './controls/Repeater';
import DefaultValue from './controls/DefaultValue';

const StyledInput = styled( InputControl )`
	${ ( props ) => {
		if ( props.isInvalid ) {
			return css`
				.components-input-control__backdrop {
					border-color: red !important;
				}

				.components-base-control__help {
					color: red !important;
				}
			`;
		}
	} }
`;

const controlGenerators = {
	panel: function ( { control, attributes, setAttributes, metaData } ) {
		return (
			<PanelBody title={ control.label }>
				<Controls
					controls={ control.children }
					attributes={ attributes }
					setAttributes={ setAttributes }
					metaData={ metaData }
				/>
			</PanelBody>
		);
	},
	text: function ( {
		attr_key,
		control,
		attributes,
		setAttributes,
		metaData,
	} ) {
		const props = useMemo( () => {
			return applyFilters( 'formgent-field-text-control', {
				isInvalid: false,
				help: '',
				attr_key,
				attributes,
				metaData,
			} );
		}, [ attributes ] );

		return (
			<StyledInput
				isInvalid={ props.isInvalid }
				label={ control.label }
				value={ attributes[ attr_key ] }
				help={ props.help }
				size="__unstable-large"
				onChange={ function ( value ) {
					// Update the attribute value in the block's attributes
					setAttributes( { [ attr_key ]: value } );
				} }
			/>
		);
	},
	select: function ( { attr_key, control, attributes, setAttributes } ) {
		return (
			<SelectControl
				label={ control.label }
				value={ attributes[ attr_key ] }
				options={ control.options }
				onChange={ function ( value ) {
					// Update the attribute value in the block's attributes
					setAttributes( { [ attr_key ]: value } );
				} }
				size="__unstable-large"
			/>
		);
	},
	checkbox: function ( { attr_key, control, attributes, setAttributes } ) {
		return (
			<CheckboxControl
				label={ control.label }
				checked={ attributes[ attr_key ] }
				onChange={ function ( value ) {
					// Update the attribute value in the block's attributes
					setAttributes( { [ attr_key ]: value } );
				} }
			/>
		);
	},
	switch: function ( { attr_key, control, attributes, setAttributes } ) {
		return (
			<ToggleControl
				label={ control.label }
				checked={ attributes[ attr_key ] }
				onChange={ function ( value ) {
					// Update the attribute value in the block's attributes
					setAttributes( { [ attr_key ]: value } );
				} }
			/>
		);
	},
	dimension: function ( { attr_key, control, setAttributes } ) {
		const [ values, setValues ] = useState( control.values );
		return (
			<BoxControl
				label={ control.label }
				values={ values }
				onChange={ function ( value ) {
					// Update dimension values
					setValues( value );
					// Update the attribute value in the block's attributes
					setAttributes( { [ attr_key ]: value } );
				} }
			/>
		);
	},
	repeater: Repeater,
	toggle_group: function ( {
		attr_key,
		control,
		attributes,
		setAttributes,
	} ) {
		const toggleOptions = control.options;
		return (
			<ToggleGroupControl
				label={ control.label }
				isBlock
				value={ attributes[ attr_key ] }
				onChange={ function ( value ) {
					// Update the attribute value in the block's attributes
					setAttributes( { [ attr_key ]: value } );
				} }
				size="__unstable-large"
			>
				{ toggleOptions.map( ( option, index ) => {
					return (
						<ToggleGroupControlOption
							key={ index }
							value={ option.value }
							label={ option.label }
						/>
					);
				} ) }
			</ToggleGroupControl>
		);
	},
	default_value: DefaultValue,
};

export default function Controls( {
	controls,
	attributes,
	setAttributes,
	metaData,
} ) {
	return Object.keys( controls ).map( ( key ) => {
		const control = controls[ key ];
		const ControlView = controlGenerators[ control[ 'type' ] ];
		return (
			<ControlView
				key={ key }
				attr_key={ key }
				control={ control }
				attributes={ attributes }
				metaData={ metaData }
				setAttributes={ setAttributes }
			/>
		);
	} );
}
