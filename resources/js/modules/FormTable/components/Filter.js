import { useState, useEffect, useRef } from '@wordpress/element';
import { useDispatch, resolveSelect } from '@wordpress/data';
import {
	AntSelect,
	AntDropdown,
	AntInput,
	AntRangePicker,
} from '@formgent/components';
import { FilterStyle } from './style';
import { useDebounce } from '@formgent/hooks/useDebounce';
import { __, sprintf } from '@wordpress/i18n';
import ReactSVG from 'react-inlinesvg';
import sliderIcon from '@icon/sliders.svg';
import filterLines from '@icon/filter-lines.svg';
import searchIcon from '@icon/search.svg';
import checkThin from '@icon/check-thin.svg';
import times from '@icon/times.svg';
import chevronDown from '@icon/chevron-down.svg';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import weekday from 'dayjs/plugin/weekday';
import localeData from 'dayjs/plugin/localeData';
dayjs.extend( customParseFormat );
dayjs.extend( weekday );
dayjs.extend( localeData );
const dateFormat = 'YYYY-MM-DD';

export default function Filter( props ) {
	const { forms, pagination, isLoading } = props;
	const [ toggleTimepicker, setToggleTimepicker ] = useState( false );
	const [ defaultSorting, setDefaultSorting ] = useState( 'date_created' );
	const [ formDateType, setFormDateType ] = useState( 'all' );
	const [ searchInput, setSearchInput ] = useState( '' );
	const debouncedSearchText = useDebounce( searchInput, 250 );
	const isFirstRender = useRef( true );

	//Datepicker default dates
	const today = new Date();
	const nextMonthFirstDay = new Date(
		today.getFullYear(),
		today.getMonth() + 1,
		2
	);
	const dateToday = today.toISOString().split( 'T' )[ 0 ];
	const dateNextMonth = nextMonthFirstDay.toISOString().split( 'T' )[ 0 ];

	const {
		updateFormSortBy,
		updateFormDateType,
		updateFormDateFrom,
		updateFormDateTo,
		updateFormSearchQuery,
		updateFormsType,
	} = useDispatch( 'formgent' );

	//handle filtered items by time
	const handleFilteredItems = ( e ) => {
		e.target.value === 'date_frame'
			? setToggleTimepicker( true )
			: setToggleTimepicker( false );
		handleFormDateType( e.target.value );
	};

	const handleClearDateFilter = () => {
		setToggleTimepicker( false );
		handleFormDateType( 'all' );
	};

	const formTypes = [
		{
			value: 'all',
			label: sprintf( __( 'All Forms (%s)', 'formgent' ), forms.length ),
		},
		{
			value: 'general',
			label: sprintf(
				__( 'General (%s)', 'formgent' ),
				forms.filter( ( item ) => item.type === 'general' ).length
			),
		},
	];

	function handleCheckedIcon( key ) {
		const checkedIcon =
			defaultSorting === key ? <ReactSVG src={ checkThin } /> : null;
		return checkedIcon;
	}

	const sortItems = [
		{
			key: 'date_created',
			label: (
				<span>
					{ __( 'Date Created', 'formgent' ) }{ ' ' }
					{ handleCheckedIcon( 'date_created' ) }
				</span>
			),
		},
		{
			key: 'last_modified',
			label: (
				<span>
					{ __( 'Last Modified', 'formgent' ) }{ ' ' }
					{ handleCheckedIcon( 'last_modified' ) }
				</span>
			),
		},
		{
			key: 'alphabetical',
			label: (
				<span>
					{ __( 'Alphabetical', 'formgent' ) }{ ' ' }
					{ handleCheckedIcon( 'alphabetical' ) }
				</span>
			),
		},
		{
			key: 'last_submission',
			label: (
				<span>
					{ __( 'Last Submission', 'formgent' ) }{ ' ' }
					{ handleCheckedIcon( 'last_submission' ) }
				</span>
			),
		},
		{
			key: 'unread',
			label: (
				<span>
					{ __( 'Unread', 'formgent' ) }{ ' ' }
					{ handleCheckedIcon( 'unread' ) }
				</span>
			),
		},
		{
			key: 'publish',
			label: (
				<span>
					{ __( 'Active', 'formgent' ) }{ ' ' }
					{ handleCheckedIcon( 'publish' ) }
				</span>
			),
		},
		{
			key: 'draft',
			label: (
				<span>
					{ __( 'Inactive', 'formgent' ) }{ ' ' }
					{ handleCheckedIcon( 'draft' ) }
				</span>
			),
		},
	];

	const formDateSorting = [
		{
			key: 'all',
			label: <span>{ __( 'All', 'formgent' ) }</span>,
		},
		{
			key: 'today',
			label: <span>{ __( 'Today', 'formgent' ) }</span>,
		},
		{
			key: 'yesterday',
			label: <span>{ __( 'Yesterday', 'formgent' ) }</span>,
		},
		{
			key: 'last_week',
			label: <span>{ __( 'Last Week', 'formgent' ) }</span>,
		},
		{
			key: 'last_month',
			label: <span>{ __( 'Last Month', 'formgent' ) }</span>,
		},
		{
			key: 'date_frame',
			label: <span>{ __( 'Custom', 'formgent' ) }</span>,
		},
	];

	const handleFormTypes = ( type ) => {
		if ( isLoading ) return;
		updateFormsType( type );
		resolveSelect( 'formgent' ).getForms(
			pagination.current_page,
			pagination.per_page,
			Date.now(),
			defaultSorting,
			formDateType,
			null,
			null,
			'',
			type
		);
	};

	const handleSearchQuery = ( e ) => {
		const query = e.target.value;
		setSearchInput( query );
	};
	useEffect( () => {
		if ( isFirstRender.current ) {
			isFirstRender.current = false;
			return;
		}

		updateFormSearchQuery( debouncedSearchText );
		resolveSelect( 'formgent' ).getForms(
			pagination.current_page,
			pagination.per_page,
			Date.now(),
			defaultSorting,
			formDateType,
			null,
			null,
			debouncedSearchText
		);
	}, [ debouncedSearchText ] );

	const handleFormSorting = ( { key } ) => {
		if ( isLoading ) return;

		setDefaultSorting( key );
		updateFormSortBy( key );
		resolveSelect( 'formgent' ).getForms(
			pagination.current_page,
			pagination.per_page,
			Date.now(),
			key
		);
	};

	const handleFormDateType = ( value ) => {
		if ( isLoading ) return;

		updateFormDateType( value );
		setFormDateType( value );
		resolveSelect( 'formgent' ).getForms(
			pagination.current_page,
			pagination.per_page,
			Date.now(),
			defaultSorting,
			value
		);
	};

	function handleDateRange( dates, dateStrings ) {
		if ( isLoading ) return;

		const [ dateFrom, dateTo ] = dateStrings;
		updateFormDateFrom( `${ dateFrom } 00:00:01` );
		updateFormDateTo( `${ dateTo } 23:59:59` );
		resolveSelect( 'formgent' ).getForms(
			pagination.current_page,
			pagination.per_page,
			Date.now(),
			defaultSorting,
			formDateType,
			`${ dateFrom } 00:00:01`,
			`${ dateTo } 23:59:59`
		);
	}

	return (
		<FilterStyle className="formgent-form-filter">
			<div className="formgent-form-filter__left">
				<AntSelect
					onChange={ handleFormTypes }
					placeholder="Select an option"
					options={ formTypes }
					defaultValue="all"
					popupClassName="formgent-form-filter__form-type-options"
					menuItemSelectedIcon={ <ReactSVG src={ checkThin } /> }
					suffixIcon={ <ReactSVG src={ chevronDown } /> }
				></AntSelect>
			</div>
			<div className="formgent-form-filter__right">
				<div className="formgent-form-filter__search">
					<AntInput
						placeholder="Search form"
						prefix={ <ReactSVG src={ searchIcon } /> }
						onChange={ handleSearchQuery }
					/>
				</div>
				<div className="formgent-form-filter__by-time">
					<AntDropdown
						trigger={ [ 'click' ] }
						overlayClassName="formgent-form-filter__by-time__options"
						dropdownRender={ () => (
							<>
								<div className="formgent-form-filter-by-time">
									{ formDateSorting.map( ( item, index ) => {
										return (
											<div
												className="formgent-select-radio"
												key={ index }
											>
												<input
													type="radio"
													name="filter-by-time"
													id={ `formgent-select-option-${ item.key }` }
													onChange={
														handleFilteredItems
													}
													value={ item.key }
													checked={
														formDateType ===
														item.key
													}
												/>
												<label
													htmlFor={ `formgent-select-option-${ item.key }` }
													className="formgent-single-select__option"
												>
													{ item.label }
												</label>
											</div>
										);
									} ) }
								</div>
								{ toggleTimepicker && (
									<div className="formgent-form-filter-by-date-range">
										<div className="formgent-form-filter-select-timeframe">
											<span>
												{ __(
													'Select a Timeframe',
													'formgent'
												) }
											</span>
											<div className="formgent-form-filter-select-dates">
												<AntRangePicker
													defaultValue={ [
														dayjs(
															dateToday,
															dateFormat
														),
														dayjs(
															dateNextMonth,
															dateFormat
														),
													] }
													format={ dateFormat }
													onChange={ handleDateRange }
												/>
											</div>
										</div>
									</div>
								) }
							</>
						) }
					>
						<span className="formgent-form-filter__by-time__trigger">
							<ReactSVG src={ sliderIcon } />{ ' ' }
							{ __( 'Filter', 'formgent' ) }
							{ formDateType !== 'all' && (
								<span
									className="formgent-form-filter__by-time__clear"
									onClick={ handleClearDateFilter }
								>
									<ReactSVG src={ times } />
								</span>
							) }
						</span>
					</AntDropdown>
				</div>
				<div className="formgent-form-filter__sorting">
					<AntDropdown
						menu={ {
							items: sortItems,
							selectable: true,
							defaultSelectedKeys: [ 'date_created' ],
							onClick: handleFormSorting,
						} }
						trigger={ [ 'click' ] }
						overlayClassName="formgent-form-filter__sorting-dropdown"
					>
						<span className="formgent-form-filter__sorting__trigger">
							<ReactSVG src={ filterLines } />
						</span>
					</AntDropdown>
				</div>
			</div>
		</FilterStyle>
	);
}
