import { useState } from '@wordpress/element';
import { convertToTitleCase } from '@formgent/helper/utils';
import ReactSVG from 'react-inlinesvg';
import envelope from '@icon/envelope.svg';
import textIcon from '@icon/text.svg';
import alignLeft from '@icon/align-left.svg';
import hashIcon from '@icon/hash.svg';
import linkIcon from '@icon/link.svg';
import fileIcon from '@icon/file.svg';
import checkSquare from '@icon/check-square.svg';
import userIcon from '@icon/user.svg';
import dropdownIcon from '@icon/chevron-down-circle.svg';
import markerIcon from '@icon/marker-pin.svg';
import radioIcon from '@icon/radios.svg';
import inputIcon from '@icon/text-input-left.svg';
import userAlt from '@icon/user-alt.svg';
import { AntProgress, AntSwitch } from '@formgent/components';
import SummaryPieChart from './SummaryPicChart';

export default function FieldContent( props ) {
	const { summaryFields, summaries, handleOnScroll } = props;
	const [ pieChartVisibility, setPieChartVisibility ] = useState( {} );

	const fieldIcons = {
		email: envelope,
		text: textIcon,
		textarea: alignLeft,
		number: hashIcon,
		website: linkIcon,
		gdpr: fileIcon,
		address: markerIcon,
		name: userIcon,
		dropdown: dropdownIcon,
		'single-choice': radioIcon,
		'multiple-choice': checkSquare,
		'input-masking': inputIcon,
	};

	const {
		'single-choice': singleChoice,
		'multiple-choice': multipleChoice,
		dropdown: dropdown,
		...generalFields
	} = summaries;

	const selectionFields = {
		'single-choice': singleChoice,
		'multiple-choice': multipleChoice,
		dropdown: dropdown,
	};

	return (
		<>
			{ /* General Fields Summary */ }
			{ summaryFields.length &&
				summaryFields.map( ( field, index ) => {
					const fieldName = field.field_name;
					if ( ! selectionFields[ field.field_type ] ) {
						return (
							field.field_type !== 'gdpr' &&
							field.field_type !== '' && (
								<div
									className={ `formgent-summary-item formgent-summary-item--${ field.field_type }` }
									key={ index }
								>
									<div className="formgent-summary-item__top">
										<div className="formgent-summary-item__icon">
											<ReactSVG
												src={
													fieldIcons[
														field.field_type
													]
												}
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
										onScroll={ ( e ) =>
											handleOnScroll(
												e,
												field.field_name
											)
										}
									>
										{ generalFields[ fieldName ]?.length >
										0 ? (
											generalFields[ fieldName ].map(
												( item ) => (
													<div
														className="formgent-summary-item__content__single"
														key={
															item.id ||
															item.parent_id
														}
													>
														{ typeof item.value ===
														'string' ? (
															item.value
														) : typeof item.value ===
																'object' &&
														  item.value !==
																null ? (
															Object.keys(
																item.value
															).map(
																(
																	key,
																	idx
																) => (
																	<div
																		key={
																			idx
																		}
																		className="formgent-summary-item__content__single__sub-item"
																	>
																		<span>
																			{ convertToTitleCase(
																				key
																			) }
																		</span>
																		<strong>
																			{
																				item
																					.value[
																					key
																				]
																			}
																		</strong>
																	</div>
																)
															)
														) : (
															<div>
																No response yet!
															</div>
														) }
													</div>
												)
											)
										) : (
											<div className="formgent-summary-item__content__not-found">
												No response yet!
											</div>
										) }
									</div>
								</div>
							)
						);
					}
					return null;
				} ) }

			{ /* Selection Fields Summary */ }
			{ summaryFields.length &&
				summaryFields.map( ( field, index ) => {
					const fieldName = field.field_name;
					const totalSum = selectionFields[ fieldName ]?.reduce(
						( acc, item ) => acc + item.total,
						0
					);
					const showPieChart =
						pieChartVisibility[ fieldName ] || false;
					if ( selectionFields[ field.field_type ] ) {
						return (
							<div
								className={ `formgent-summary-item formgent-summary-item--${ field.field_type }` }
								key={ index }
							>
								<div className="formgent-summary-item__top formgent-summary-item__top--selection">
									<div className="formgent-summary-item__top__left">
										<div className="formgent-summary-item__icon">
											<ReactSVG
												src={
													fieldIcons[
														field.field_type
													]
												}
											/>
										</div>
										<div className="formgent-summary-item__title">
											<h4>{ field.label }</h4>
											<span>{ `${ field.total_answer } out of ${ field.total_response } people answered this question` }</span>
										</div>
									</div>
									<div className="formgent-summary-item__top__right">
										<span>Pie chart</span>
										<AntSwitch
											onChange={ ( checked ) => {
												setPieChartVisibility(
													( prev ) => ( {
														...prev,
														[ fieldName ]: checked,
													} )
												);
											} }
										/>
									</div>
								</div>
								<div
									className="formgent-summary-item__content"
									data-field={ field.field_name }
									onScroll={ ( e ) =>
										handleOnScroll( e, field.field_name )
									}
								>
									{ selectionFields[ fieldName ]?.length >
										0 && ! showPieChart ? (
										selectionFields[ fieldName ].map(
											( item, index ) => {
												const percentage =
													( item.total / totalSum ) *
													100;

												return (
													<div
														className="formgent-summary-item__content__single"
														key={ index }
													>
														<div className="formgent-summary-item__content__single__label">
															<span className="formgent-summary-item-sub-item-label">
																{ item.label }
															</span>
															<div className="formgent-summary-item-sub-item-stats">
																<span>
																	<ReactSVG
																		src={
																			userAlt
																		}
																	/>{ ' ' }
																	{
																		item.total
																	}{ ' ' }
																	responses
																</span>
																<strong>
																	{ percentage.toFixed(
																		2
																	) }
																	%
																</strong>
															</div>
														</div>
														<AntProgress
															percent={
																percentage
															}
															showInfo={ false }
															size={ [
																'100%',
																12,
															] }
															strokeColor="#383F47"
														/>
													</div>
												);
											}
										)
									) : (
										<SummaryPieChart
											chartData={
												selectionFields[ fieldName ]
											}
										/>
									) }
								</div>
							</div>
						);
					}
					return null;
				} ) }
		</>
	);
}
