import {
	AntButton,
	AntCheckbox,
	AntDropdown,
	AntInput,
	AntTabs,
} from '@formgent/components';
import ReactSVG from 'react-inlinesvg';
import { TableActionStyle, TableHeaderStyle, TableTabStyle } from './style';

// Icon
import checkIcon from '@icon/check-square.svg';
import chevronDownIcon from '@icon/chevron-down.svg';
import closeIcon from '@icon/close.svg';
import columnIcon from '@icon/column-3.svg';
import downloadIcon from '@icon/download.svg';
import filterIcon from '@icon/filter-lines.svg';
import printIcon from '@icon/print.svg';
import refreshIcon from '@icon/refresh.svg';
import searchIcon from '@icon/search.svg';
import trashIcon from '@icon/trash.svg';

export default function TableHeader( props ) {
	const {
		id,
		selectedRowKeys,
		setSelectedRowKeys,
		handleTableChange,
		totalCompletedItems,
		totalPartialItems,
		activeTab,
		setActiveTab,
		visibleColumns,
		setVisibleColumns,
		setFieldColumnHide,
		responseFields,
		handleDelete,
		handlePrint,
		downloadItems,
		handleDownload,
	} = props;

	// Handle Tab Change
	function handleTabChange( key ) {
		setActiveTab( key );
	}

	// Handle Search
	function handleSearch( value ) {
		console.log( 'Search:', value );
	}

	// Handle Filter
	function handleFilter() {
		console.log( 'Filter clicked' );
	}

	// Handle Refresh
	function handleRefresh() {
		handleTableChange();
		console.log( 'Refresh clicked' );
	}

	// Handle column checkbox change
	function handleColumnCheckbox( e, id ) {
		setVisibleColumns( ( prevState ) => {
			if ( e.target.checked ) {
				setFieldColumnHide( false );
				return [ ...prevState, id ];
			} else {
				setFieldColumnHide( id );
				return prevState.filter( ( item ) => item !== id );
			}
		} );
	}

	// Handle Bulk Selection
	function handleBulkSelection() {
		setSelectedRowKeys( responses?.map( ( item ) => item.id ) );
	}

	// Handle Clear Selection
	function handleClearSelection() {
		setSelectedRowKeys( [] );
	}

	// Tab Items
	const tabItems = [
		{
			key: 'completed',
			label: `Completed (${ totalCompletedItems })`,
		},
		{
			key: 'partial',
			label: `Partial (${ totalPartialItems })`,
		},
	];

	return (
		<TableHeaderStyle className="formgent-table-header">
			{ selectedRowKeys.length !== 0 ? (
				<TableActionStyle className="formgent-table-header__action">
					<div className="formgent-table-header__selection">
						<span className="formgent-table-header__selection__text">
							<ReactSVG
								width="16"
								height="16"
								src={ checkIcon }
							/>
							{ selectedRowKeys.length } response selected
							<button
								className="formgent-table-header__selection__clear"
								onClick={ handleClearSelection }
							>
								<ReactSVG
									width="16"
									height="16"
									src={ closeIcon }
								/>
							</button>
						</span>
						<button
							className="formgent-table-header__selection__all"
							onClick={ handleBulkSelection }
						>
							Select All
						</button>
					</div>
					<AntDropdown
						menu={ {
							items: downloadItems,
							onClick: handleDownload,
						} }
						placement="bottomLeft"
					>
						<AntButton
							onClick={ ( e ) => e.preventDefault() }
							icon={
								<ReactSVG
									width="14"
									height="14"
									src={ downloadIcon }
								/>
							}
						/>
					</AntDropdown>
					<AntButton
						onClick={ handlePrint }
						icon={
							<ReactSVG
								width="14"
								height="14"
								src={ printIcon }
							/>
						}
					/>
					<AntButton
						onClick={ handleDelete }
						icon={
							<ReactSVG
								width="14"
								height="14"
								src={ trashIcon }
							/>
						}
						className="formgent-table-header__delete"
					/>
				</TableActionStyle>
			) : (
				<TableTabStyle className="formgent-table-header__tab">
					<AntTabs
						activeKey={ activeTab }
						onChange={ handleTabChange }
						items={ tabItems }
					/>
				</TableTabStyle>
			) }

			<TableActionStyle className="formgent-table-header__action">
				<AntInput
					placeholder="Search responses"
					prefix={
						<ReactSVG width="14" height="14" src={ searchIcon } />
					}
					onChange={ ( e ) => handleSearch( e.target.value ) }
					className="formgent-table-header__search"
				/>

				<AntButton
					onClick={ handleFilter }
					icon={
						<ReactSVG width="14" height="14" src={ filterIcon } />
					}
				>
					Filters
				</AntButton>

				{ selectedRowKeys.length === 0 ? (
					<>
						<div className="formgent-table-header__dropdown">
							<div className="formgent-table-header__dropdown__toggle">
								<ReactSVG
									width="14"
									height="14"
									src={ columnIcon }
								/>
								<span>
									Column{ ' ' }
									<ReactSVG
										width="14"
										height="14"
										src={ chevronDownIcon }
									/>
								</span>
							</div>

							<div className="formgent-table-header__dropdown__content">
								<span className="formgent-table-header__dropdown__title">
									Show Hide Columns
								</span>
								{ responseFields?.map( ( field, index ) => {
									return (
										<AntCheckbox
											key={ index }
											checked={ visibleColumns.includes(
												field.id
											) }
											onChange={ ( e ) =>
												handleColumnCheckbox(
													e,
													field.id
												)
											}
										>
											{ field.label }
										</AntCheckbox>
									);
								} ) }
							</div>
						</div>

						<AntDropdown
							menu={ {
								items: downloadItems,
								onClick: handleDownload,
							} }
							placement="bottomRight"
						>
							<AntButton
								onClick={ ( e ) => e.preventDefault() }
								icon={
									<ReactSVG
										width="14"
										height="14"
										src={ downloadIcon }
									/>
								}
							/>
						</AntDropdown>

						<AntButton
							onClick={ handleRefresh }
							icon={
								<ReactSVG
									width="14"
									height="14"
									src={ refreshIcon }
								/>
							}
						/>
					</>
				) : (
					''
				) }
			</TableActionStyle>
		</TableHeaderStyle>
	);
}
