import {
	CheckboxControl,
	PanelBody,
	SelectControl,
	ToggleControl,
	Button,
	Icon,
	TextareaControl,
	__experimentalInputControl as InputControl,
	__experimentalBoxControl as BoxControl,
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import Repeater from './controls/Repeater';

const controlGenerators = {
	panel: function ( { control, attributes, setAttributes } ) {
		return (
			<PanelBody title={ control.label }>
				<Controls
					controls={ control.children }
					attributes={ attributes }
					setAttributes={ setAttributes }
				/>
			</PanelBody>
		);
	},
	text: function ( { attr_key, control, attributes, setAttributes } ) {
		return (
			<>
				<label className="formgent-control-label">
					{ control.label }
				</label>
				<InputControl
					value={ attributes[ attr_key ] }
					onChange={ ( value ) =>
						setAttributes( { [ attr_key ]: value } )
					}
				/>
			</>
		);
	},
	select: function ( { attr_key, control, attributes, setAttributes } ) {
		return (
			<>
				<label className="formgent-control-label">
					{ control.label }
				</label>
				<SelectControl
					value={ attributes[ attr_key ] }
					options={ control.options }
					onChange={ ( value ) =>
						setAttributes( { [ attr_key ]: value } )
					}
				/>
			</>
		);
	},
	checkbox: function ( { attr_key, control, attributes, setAttributes } ) {
		return (
			<CheckboxControl
				label={ control.label }
				checked={ attributes[ attr_key ] }
				onChange={ ( value ) =>
					setAttributes( { [ attr_key ]: value } )
				}
			/>
		);
	},
	switch: function ( { attr_key, control, attributes, setAttributes } ) {
		return (
			<ToggleControl
				label={ control.label }
				checked={ attributes[ attr_key ] }
				onChange={ ( value ) =>
					setAttributes( { [ attr_key ]: value } )
				}
			/>
		);
	},
	dimension: function ( { attr_key, control, setAttributes } ) {
		const [ values, setValues ] = useState( control.values );
		return (
			<>
				<label className="formgent-control-label">
					{ control.label }
				</label>
				<BoxControl
					label=""
					values={ values }
					onChange={ ( value ) => {
						setValues( value );
						setAttributes( { [ attr_key ]: value } );
					} }
				/>
			</>
		);
	},
	repeater: Repeater,
};

export default function Controls( { controls, attributes, setAttributes } ) {
	return Object.keys( controls ).map( ( key ) => {
		const control = controls[ key ];
		const ControlView = controlGenerators[ control[ 'type' ] ];
		return (
			<ControlView
				key={ key }
				attr_key={ key }
				control={ control }
				attributes={ attributes }
				setAttributes={ setAttributes }
			/>
		);
	} );
}