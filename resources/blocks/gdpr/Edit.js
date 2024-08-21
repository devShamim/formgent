/**
 * wordpress dependencies
 */
import { RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
	return (
		<div className="formgent-editor-block-list__single formgent-editor-block-list__single--gdpr">
			{ /* <label
				className={ `block-editor-block-list__single__label label-align-${ attributes.label_alignment }` }
			>
				{ attributes.label }
				{ attributes.required ? (
					<span className="formgent-editor-block-list__single__label__required">
						*
					</span>
				) : null }
			</label> */ }
			<div
				className={ `formgent-editor-block-list__single__wrapper formgent-label-align-${ attributes.label_alignment }` }
			>
				<input
					className="formgent-editor-block-list__single__input formgent-editor-block-list__single__input--checkbox"
					type="checkbox"
					id={ attributes.id }
					name={ attributes.name }
					checked={ attributes.checked }
					onChange={ () => {} }
				/>
				<div className="formgent-editor-block-list__single__label-container">
					<RichText
						className="block-editor-block-list__single__sub-label"
						tagName="span"
						value={ attributes.description }
						onChange={ ( description ) =>
							setAttributes( { description } )
						}
						placeholder={ __( 'Enter description' ) }
					/>
					{ attributes.required ? (
						<span className="formgent-editor-block-list__single__label__required">
							*
						</span>
					) : null }
				</div>
			</div>
		</div>
	);
}
