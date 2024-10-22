import { Button, Icon } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { nanoid } from 'nanoid';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ReactSVG from 'react-inlinesvg';
import dotsMove from '@icon/dots-move.svg';
import closeIcon from '@icon/close-solid-circle.svg';
import Controls from '../Controls';

export default function Repeater( {
	attr_key,
	control,
	attributes,
	setAttributes,
} ) {
	const [ openIndex, setOpenIndex ] = useState( null );
	const options = attributes[ attr_key ];

	// Handle drag and drop reordering
	const onDragEnd = ( { destination, source }, sortableArray ) => {
		if (
			! destination ||
			( destination.droppableId === source.droppableId &&
				destination.index === source.index )
		) {
			return;
		}
		const [ removedItem ] = sortableArray.splice( source.index, 1 );
		sortableArray.splice( destination.index, 0, removedItem );
		setAttributes( { [ attr_key ]: sortableArray } );
	};

	//handle repeater field remove
	const handleRemoveField = ( id ) => {
		const newFields = options.filter( ( item ) => item.id !== id );

		if ( newFields.length > 0 ) {
			setAttributes( { [ attr_key ]: newFields } );
		}
	};

	//handle add repeater field
	const handleAddField = () => {
		const newField = { id: nanoid(), label: 'New Option', value: nanoid() };
		const newFields = [ ...options, newField ];
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
			const newFields = options.map( ( item ) => {
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

			<DragDropContext
				onDragEnd={ ( results ) => onDragEnd( results, options ) }
			>
				<Droppable
					droppableId="formgent-droppable-options"
					type="formgent-options"
				>
					{ ( provided ) => (
						<div
							ref={ provided.innerRef }
							{ ...provided.droppableProps }
							className="formgent-droppable-options"
						>
							{ options &&
								options.map( ( field, index ) => {
									const labelKey = control.label_key;
									return (
										<Draggable
											draggableId={ field.id }
											index={ index }
											key={ field.id }
										>
											{ ( provided ) => (
												<div
													key={ field.id }
													className={ `formgent-repeater-field ${
														openIndex === index
															? 'formgent-repeater-field--expanded'
															: ''
													}` }
												>
													<div
														className="formgent-repeater-field-control"
														ref={
															provided.innerRef
														}
														{ ...provided.draggableProps }
														{ ...provided.dragHandleProps }
													>
														<div className="formgent-repeater-field-control-actions">
															<div
																className="formgent-repeater-field-title"
																onClick={ () =>
																	toggleFieldContent(
																		index
																	)
																}
															>
																{ typeof field[
																	labelKey
																] ===
																'undefined'
																	? control
																			.fields[
																			control
																				.label_key
																	  ]?.label
																	: field[
																			labelKey
																	  ] }
															</div>
															{ showActions ? (
																<span
																	onClick={ () =>
																		handleRemoveField(
																			field.id
																		)
																	}
																	className="formgent-repeater-field-remove"
																>
																	<ReactSVG
																		src={
																			closeIcon
																		}
																	/>
																</span>
															) : (
																''
															) }
														</div>
														<div className="formgent-repeater-field-control-move">
															<ReactSVG
																src={ dotsMove }
															/>
														</div>
													</div>

													{ openIndex === index && (
														<div className="formgent-repeater-field-control-content">
															<Controls
																controls={
																	control.fields
																}
																attributes={
																	field
																}
																setAttributes={ (
																	updatedField
																) => {
																	Object.keys(
																		updatedField
																	).forEach(
																		(
																			fieldKey
																		) => {
																			handleChange(
																				field.id,
																				fieldKey,
																				updatedField[
																					fieldKey
																				]
																			);
																		}
																	);
																} }
															/>
														</div>
													) }
												</div>
											) }
										</Draggable>
									);
								} ) }
						</div>
					) }
				</Droppable>
			</DragDropContext>
			<div className="formgent-repeater__add-item">
				{ showActions ? (
					<span
						className="formgent-repeater__add-item__link"
						onClick={ handleAddField }
					>
						<Icon icon="plus" />{ ' ' }
						<span>{ control.add_button_text }</span>
					</span>
				) : (
					''
				) }
			</div>
		</div>
	);
}
