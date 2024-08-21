/**
 * wordpress dependencies
 */
import { RichText } from '@wordpress/block-editor';
import ReactSVG from 'react-inlinesvg';
import angleDown from '@icon/chevron-down.svg';
import { __ } from '@wordpress/i18n';

import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
	//const phoneNumberParts = attributes.value.split( ')' );
	console.log( attributes );
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
					placeholder={ __( 'Type your question' ) }
				/>
				{ attributes.required ? (
					<span className="formgent-editor-block-list__single__label__required">
						*
					</span>
				) : null }
			</div>

			<div className="formgent-editor-block-list__single__wrapper">
				<div className="formgent-editor-block-list__single__dialer">
					<span className="formgent-editor-block-list__single__dialer__flag">
						<img
							src={ `${ formgent_blocks.assetUrl }/images/flags/bd.png` }
							alt="Formgent Flag"
						/>
						<ReactSVG src={ angleDown } />
					</span>
					<div className="formgent-editor-block-list__single__dialer__content">
						<span className="formgent-editor-block-list__single__dialer__code">
							(+880)
						</span>
						<input
							className="formgent-editor-block-list__single__dialer__input"
							type="text"
							name={ attributes.name }
							placeholder={ attributes.placeholder }
							value={ attributes.value.value_two }
							onChange={ () => {} }
						/>
					</div>
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
