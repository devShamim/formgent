import { RichText } from '@wordpress/block-editor';
import { useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { nanoid } from 'nanoid';

import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
	function handleClick( e ) {
		e.preventDefault(); // Prevents the default action
		e.stopPropagation(); // Stops the event from propagating
	}

	function handleAddOption() {
		const newField = { id: nanoid(), label: 'New Option', value: nanoid() };
		const newFields = [ ...attributes.options, newField ];
		setAttributes( { options: newFields } );
	}

	function handleDeleteOption( id ) {
		const newOptions = attributes.options.filter(
			( option ) => option.id !== id
		);
		if ( newOptions.length > 0 ) {
			setAttributes( { options: newOptions } );
		}
	}

	useEffect( () => {
		if ( attributes.options.length === 0 ) {
			handleAddOption();
		}
	}, [] );

	return (
		<div className="formgent-editor-block-list__single">
			<div
				className={ `formgent-editor-block-list__single__label-container formgent-label-align-${ attributes.label_alignment }` }
			>
				<RichText
					className="formgent-editor-block-list__single__label"
					tagName="label"
					value={ attributes.label }
					onChange={ ( content ) =>
						setAttributes( { label: content } )
					}
					placeholder={ __( 'Select your choice' ) }
				/>
				{ attributes.required ? (
					<span className="formgent-editor-block-list__single__label__required">
						*
					</span>
				) : null }
			</div>
			<div className="formgent-editor-block-list__single__wrapper formgent-editor-block-list__single__wrapper--single-choice">
				<div className="formgent-editor-block-list__single__box">
					{ attributes.options.map( ( option, index ) => (
						<div
							key={ index }
							className={ `formgent-editor-block-list__single__box__choice ${
								attributes.options.length === 1 ? 'disable' : ''
							} formgent-editor-block-list__single__box__choice--${
								attributes.style
							}` }
						>
							<input
								className="formgent-editor-block-list__single__input formgent-editor-block-list__single__input--radio"
								type="radio"
								id={ option.id }
								name={ attributes.name }
								value={ option.value }
								checked={ attributes.value === option.value }
								onChange={ () => {} }
								onClick={ ( e ) => handleClick( e ) }
							/>
							<label
								htmlFor={ option.id }
								className="formgent-editor-block-list__single__label"
							>
								{ option.label }
							</label>
							<button
								className="formgent-editor-block-list__single__box__choice__delete"
								onClick={ () => {
									handleDeleteOption( option.id );
								} }
							>
								<svg
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M17 7L7 17M7 7L17 17"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</button>
						</div>
					) ) }

					<button
						className="formgent-editor-block-list__single__box__add"
						onClick={ () => {
							handleAddOption();
						} }
					>
						<span className="formgent-editor-block-list__single__box__add__icon">
							<svg
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M12 5V19M5 12H19"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</span>
						Add Option
					</button>
				</div>
				<RichText
					className="formgent-editor-block-list__single__sub-label"
					tagName="span"
					value={ attributes.sub_label }
					onChange={ ( content ) =>
						setAttributes( { sub_label: content } )
					}
					placeholder={ __( 'Type sub label here (optional)' ) }
				/>
			</div>
		</div>
	);
}
