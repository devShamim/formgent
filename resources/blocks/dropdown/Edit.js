import { __ } from '@wordpress/i18n';

import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
	function handleMouseDown( e ) {
		e.preventDefault(); // Prevents the default action
		e.stopPropagation(); // Stops the event from propagating
	}

	return (
		<div className="block-editor-block-list__single">
			<label
				className={ `block-editor-block-list__single__label label-align-${ attributes.label_alignment }` }
			>
				{ attributes.label }
				{ attributes.required ? (
					<span className="block-editor-block-list__single__label__required">
						*
					</span>
				) : null }
			</label>
			<div className="block-editor-block-list__single__wrapper">
				<select
					name={ attributes.name }
					className="block-editor-block-list__single__input"
					value={ attributes.value || 'formgent-default-option' }
					onChange={ () => {} }
					onMouseDown={ ( e ) => handleMouseDown( e ) }
				>
					{ attributes.options.length > 0 ? (
						attributes.options.map( ( option, index ) => (
							<option key={ index } value={ option.value }>
								{ option.label }
							</option>
						) )
					) : (
						<option value="formgent-default-option">
							{ __( 'Please Select', 'formgent' ) }
						</option>
					) }
				</select>
				<span className="block-editor-block-list__single__sub-label">
					{ attributes.sub_label }
				</span>
			</div>
		</div>
	);
}
