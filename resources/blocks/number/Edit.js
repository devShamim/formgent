/**
 * wordpress dependencies
 */
import { RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
	return (
		<div className="formgent-editor-block-list__single">
			<span>
				<RichText
					className={ `formgent-editor-block-list__single__label formgent-label-align-${ attributes.label_alignment }` }
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
			</span>
			<div className="formgent-editor-block-list__single__wrapper">
				<input
					className="formgent-editor-block-list__single__input"
					type="number"
					name={ attributes.name }
					value={ attributes.value }
					onChange={ () => {} }
				/>
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
