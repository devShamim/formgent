/**
 * wordpress dependencies
 */
import { RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
	return (
		<div
			className={ `formgent-editor-block-list__single formgent-editor-block-list__single--button formgent-editor-block-align-${ attributes.button_alignment }` }
			style={ {
				'--formgent-btn-bg-color': attributes.background_color,
				'--formgent-btn-text-color': attributes.text_color,
				'--formgent-btn-border-color': attributes.border_color,
			} }
		>
			<RichText
				className={ `formgent-editor-block-list__button-text formgent-btn formgent-btn-md formgent-btn-${ attributes.button_style }` }
				aria-label={ __( 'Button text', 'formgent' ) }
				value={ attributes.button_text }
				onChange={ ( content ) =>
					setAttributes( { button_text: content } )
				}
				placeholder={ __( 'Add text...', 'formgent' ) }
				identifier="text"
				allowedFormats={ [
					'core/bold',
					'core/italic',
					'core/strikethrough',
					'core/code',
					'core/subscript',
					'core/superscript',
					'core/text-color',
					'core/image',
					'core/underline',
				] }
			/>
		</div>
	);
}
