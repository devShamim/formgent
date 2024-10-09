import { RichText } from '@wordpress/block-editor';
import { useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { nanoid } from 'nanoid';

import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
	function handleMouseDown( e ) {
		// e.preventDefault(); // Prevents the default action
		// e.stopPropagation(); // Stops the event from propagating
	}

	function handleAddOption() {
		const newField = { id: nanoid(), label: 'New Option', value: nanoid() };
		const newFields = [ ...attributes.options, newField ];
		setAttributes( { options: newFields } );
	}

	useEffect( () => {
		if ( attributes.options.length === 0 ) {
			handleAddOption();
		}
	}, [] );

	return (
		<div
			className={ `formgent-editor-block-list__single formgent-editor-block-align-${ attributes.label_alignment }` }
		>
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
					placeholder={ __( 'Type your question' ) }
				/>
				{ attributes.required ? (
					<span className="formgent-editor-block-list__single__label__required">
						*
					</span>
				) : null }
			</div>
			<div className="formgent-editor-block-list__single__wrapper">
				<select
					name={ attributes.name }
					className="formgent-editor-block-list__single__input formgent-editor-block-list__single__input--select"
					value={ attributes.value || 'formgent-default-option' }
					onChange={ () => {} }
					onMouseDown={ ( e ) => handleMouseDown( e ) }
				>
					{ attributes.options.map( ( option, index ) => (
						<option key={ index } value={ option.value }>
							{ option.label }
						</option>
					) ) }
				</select>
				<div className="formgent-editor-block-list__single__bottom">
					<RichText
						className="formgent-editor-block-list__single__sub-label"
						tagName="span"
						value={ attributes.sub_label }
						onChange={ ( content ) =>
							setAttributes( { sub_label: content } )
						}
						placeholder={ __( 'Type sub label here (optional)' ) }
					/>
					<span className="formgent-editor-block-list__single__count">
						{ attributes.options.length } opions in list
					</span>
				</div>
			</div>
		</div>
	);
}
