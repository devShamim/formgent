/**
 * wordpress dependencies
 */
import { RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import ReactSVG from 'react-inlinesvg';
import envelopeIcon from '@icon/envelope.svg';
import './editor.scss';

export default function Edit( { attributes, setAttributes, inputProps } ) {
	return (
		<>
			<div
				className={ `formgent-editor-block-list__single formgent-editor-block-align-${ attributes.label_alignment }` }
			>
				<div
					className={ `formgent-editor-block-list__single__label-container formgent-label-align-${ attributes.label_alignment }` }
				>
					<RichText
						{ ...inputProps }
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
					<div className="formgent-has-input-icon">
						{ attributes.show_field_icon && (
							<div className="formgent-input-icon">
								<ReactSVG src={ envelopeIcon } />
							</div>
						) }

						<input
							{ ...inputProps }
							className="formgent-editor-block-list__single__input"
							type="email"
							name={ attributes.name }
							placeholder={ attributes.placeholder }
							value={ attributes.value }
							onChange={ () => {} }
						/>
					</div>

					<RichText
						{ ...inputProps }
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

			{ attributes.enable_confirmation_field && (
				<>
					<div
						style={ {
							height: `${ attributes.confirmation_field_gap }`,
						} }
					></div>
					<div
						className={ `formgent-editor-block-list__single formgent-editor-block-align-${ attributes.label_alignment }` }
					>
						<div
							className={ `formgent-editor-block-list__single__label-container formgent-label-align-${ attributes.label_alignment }` }
						>
							<RichText
								{ ...inputProps }
								className="formgent-editor-block-list__single__label"
								tagName="label"
								value={ attributes.confirm_label }
								onChange={ ( content ) =>
									setAttributes( { confirm_label: content } )
								}
								placeholder={ __( 'Type your question' ) }
							/>
							<span className="formgent-editor-block-list__single__label__required">
								*
							</span>
						</div>
						<div className="formgent-editor-block-list__single__wrapper">
							<div className="formgent-has-input-icon">
								{ attributes.show_field_icon && (
									<div className="formgent-input-icon">
										<ReactSVG src={ envelopeIcon } />
									</div>
								) }

								<input
									{ ...inputProps }
									className="formgent-editor-block-list__single__input"
									type="email"
									name={ `${ attributes.name }_confirm` }
									placeholder={
										attributes.confirm_placeholder
									}
									value=""
									onChange={ () => {} }
								/>
							</div>

							<RichText
								{ ...inputProps }
								className="formgent-editor-block-list__single__sub-label"
								tagName="span"
								value={ attributes.confirm_sub_label }
								onChange={ ( content ) =>
									setAttributes( {
										confirm_sub_label: content,
									} )
								}
								placeholder={ __(
									'Type sub label here (optional)'
								) }
							/>
						</div>
					</div>
				</>
			) }
		</>
	);
}
