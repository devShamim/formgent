export default function Edit( { attributes, setAttributes } ) {
	return (
		<div className="formgent-form-block">
			<label
				className={ `formgent-form-block__label label-align-${ attributes.label_alignment }` }
			>
				{ attributes.label }
				{ attributes.required ? (
					<span className="formgent-form-block__label__required">
						*
					</span>
				) : null }
			</label>
			<div className="formgent-form-block__wrapper">
				<span className="formgent-form-block__code">+88</span>
				<input
					className="formgent-form-block__input"
					type="text"
					name={ attributes.name }
					placeholder={ attributes.placeholder }
					value={ attributes.value }
					onchange={ () => {} }
				/>
				<span className="formgent-form-block__sub-label">
					{ attributes.sub_label }
				</span>
			</div>
		</div>
	);
}