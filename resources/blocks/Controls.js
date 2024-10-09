import {
	CheckboxControl,
	PanelBody,
	SelectControl,
	ToggleControl,
	__experimentalNumberControl as NumberControl,
	__experimentalInputControl as InputControl,
	__experimentalBoxControl as BoxControl,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from '@wordpress/components';
import { HeightControl } from '@wordpress/block-editor';
import { useMemo, useEffect, useState } from '@wordpress/element';
import { applyFilters } from '@wordpress/hooks';
import styled, { css } from 'styled-components';
import Repeater from './controls/Repeater';
import DefaultValue from './controls/DefaultValue';
import PickColor from './controls/ColorPicker';
import { isUndefined } from 'lodash';

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

const StyledBlockEditorControl = styled.div`
	margin-bottom: 24px;
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

		useEffect( () => {
			setAttributes( {
				...attributes,
				isInvalid: props.isInvalid,
			} );
		}, [ props.isInvalid ] );

		return (
			<StyledInput
				isInvalid={ props.isInvalid }
				label={ control.label }
				value={ attributes[ attr_key ] }
				help={ props.help }
				size="__unstable-large"
				type={ control?.inputType }
				onChange={ function ( value ) {
					// Update the attribute value in the block's attributes
					setAttributes( { [ attr_key ]: value } );
				} }
			/>
		);
	},
	number: function ( { attr_key, control, attributes, setAttributes } ) {
		const handleChange = ( value ) => {
			if ( isUndefined( control.precision ) || control.precision ) {
				setAttributes( { [ attr_key ]: value } );
				return;
			}

			const integerValue = parseInt( value, 10 );

			if ( ! isNaN( integerValue ) ) {
				setAttributes( { [ attr_key ]: integerValue } );
			}
		};

		return (
			<NumberControl
				label={ control.label }
				value={ attributes[ attr_key ] }
				size="__unstable-large"
				step={ 1 }
				onChange={ handleChange }
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
	height: function ( { attr_key, control, attributes, setAttributes } ) {
		return (
			<StyledBlockEditorControl>
				<HeightControl
					label={ control.label }
					value={ attributes[ attr_key ] }
					onChange={ function ( value ) {
						setAttributes( { [ attr_key ]: value } );
					} }
				/>
			</StyledBlockEditorControl>
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
	color: PickColor,
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

		if ( control?.condition && ! control.condition( attributes ) ) {
			return false;
		}

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
