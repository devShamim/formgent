import { Button, Icon } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { nanoid } from 'nanoid';
import Controls from '../Controls';

export default function Repeater( {
	attr_key,
	control,
	attributes,
	setAttributes,
} ) {
	const [ openIndex, setOpenIndex ] = useState( null );

	//handle repeater field remove
	const handleRemoveField = ( id ) => {
		const newFields = attributes[ attr_key ].filter(
			( item ) => item.id !== id
		);

		if ( newFields.length > 0 ) {
			setAttributes( { [ attr_key ]: newFields } );
		}
	};

	//handle add repeater field
	const handleAddField = () => {
		const newField = { id: nanoid(), label: 'New Option', value: nanoid() };
		const newFields = [ ...attributes[ attr_key ], newField ];
		setAttributes( { [ attr_key ]: newFields } );
		setOpenIndex( newFields.length - 1 );
	};

	//handle repeater field accordion
	const toggleFieldContent = ( index ) => {
		setOpenIndex( openIndex === index ? null : index );
	};

	//update repeater field value to block attributes
	const handleChange = ( id, fieldKey, value ) => {
		if ( typeof control.onChange === 'function' ) {
			control.onChange(
				id,
				fieldKey,
				value,
				attr_key,
				attributes,
				setAttributes
			);
		} else {
			const newFields = attributes[ attr_key ].map( ( item ) => {
				if ( item.id === id ) {
					return { ...item, [ fieldKey ]: value };
				}
				return item;
			} );

			setAttributes( { [ attr_key ]: newFields } );
		}
	};

	const showActions =
		typeof control.show_actions === 'undefined' || control.show_actions;
	return (
		<div className="formgent-repeater-control">
			<label className="formgent-control-label">{ control.label }</label>
			{ attributes[ attr_key ] &&
				attributes[ attr_key ].map( ( field, index ) => {
					const labelKey = control.label_key;
					return (
						<div
							key={ field.id }
							className={ `formgent-repeater-field ${
								openIndex === index
									? 'formgent-repeater-field--expanded'
									: ''
							}` }
						>
							<div className="formgent-repeater-field-control">
								<div
									className="formgent-repeater-field-title"
									onClick={ () =>
										toggleFieldContent( index )
									}
								>
									{ typeof field[ labelKey ] === 'undefined'
										? control.fields[ control.label_key ]
												?.label
										: field[ labelKey ] }
								</div>
								{ showActions ? (
									<Button
										onClick={ () =>
											handleRemoveField( field.id )
										}
										className="formgent-repeater-field-remove"
									>
										X
									</Button>
								) : (
									''
								) }
							</div>
							{ openIndex === index && (
								<div className="formgent-repeater-field-control-content">
									<Controls
										controls={ control.fields }
										attributes={ field }
										setAttributes={ ( updatedField ) => {
											Object.keys( updatedField ).forEach(
												( fieldKey ) => {
													handleChange(
														field.id,
														fieldKey,
														updatedField[ fieldKey ]
													);
												}
											);
										} }
									/>
								</div>
							) }
						</div>
					);
				} ) }
			<div className="formgent-repeater__add-item">
				{ showActions ? (
					<Button variant="primary" onClick={ handleAddField }>
						<Icon icon="plus" /> { control.add_button_text }
					</Button>
				) : (
					''
				) }
			</div>
		</div>
	);
}
