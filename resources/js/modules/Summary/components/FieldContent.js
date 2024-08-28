import ReactSVG from 'react-inlinesvg';
import envelope from '@icon/envelope.svg';
import textIcon from '@icon/text.svg';
import alignLeft from '@icon/align-left.svg';
import hashIcon from '@icon/hash.svg';
import linkIcon from '@icon/link.svg';
import fileIcon from '@icon/file.svg';

export default function FieldContent( props ) {
	const { summaryFields, summaries, handleOnScroll } = props;

	const fieldIcons = {
		email: envelope,
		text: textIcon,
		textarea: alignLeft,
		number: hashIcon,
		website: linkIcon,
		gdpr: fileIcon,
	};

	return (
		summaryFields.length &&
		summaryFields.map( ( field, index ) => {
			const fieldName = field.field_name;
			return (
				field.field_type !== 'gdpr' && (
					<div
						className={ `formgent-summary-item formgent-summary-item--${ field.field_type }` }
						key={ index }
					>
						<div className="formgent-summary-item__top">
							<div className="formgent-summary-item__icon">
								<ReactSVG
									src={ fieldIcons[ field.field_type ] }
								/>
							</div>
							<div className="formgent-summary-item__title">
								<h4>{ field.label }</h4>
								<span>{ `${ field.total_answer } out of ${ field.total_response } people answered this question` }</span>
							</div>
						</div>
						<div
							className="formgent-summary-item__content"
							data-field={ field.field_name }
							onScroll={ ( e ) => {
								handleOnScroll( e, field.field_name );
							} }
						>
							{ summaries[ fieldName ]?.length > 0 ? (
								summaries[ fieldName ].map( ( item ) => (
									<div
										className="formgent-summary-item__content__single"
										key={ item.id || item.parent_id }
									>
										{ typeof item.value !== 'object' ? (
											item.value
										) : item.value.length > 0 ? (
											item.value.forEach( ( key ) => {
												<span className="formgent-summary-item__content__single__sub-item">
													{ key }
												</span>;
											} )
										) : (
											<div>Not found</div>
										) }
									</div>
								) )
							) : (
								<div className="formgent-summary-item__content__not-found">
									No response!
								</div>
							) }
						</div>
					</div>
				)
			);
		} )
	);
}
