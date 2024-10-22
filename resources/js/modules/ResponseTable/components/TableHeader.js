import {
	AntButton,
	AntCheckbox,
	AntInput,
	AntTabs,
	AntDropdown,
} from '@formgent/components';
import { useState } from '@wordpress/element';
import ReactSVG from 'react-inlinesvg';
import { TableActionStyle, TableHeaderStyle, TableTabStyle } from './style';

// Icon
import chevronDownIcon from '@icon/chevron-down.svg';
import closeIcon from '@icon/close.svg';
import columnIcon from '@icon/column-3.svg';
import refreshIcon from '@icon/refresh.svg';
import searchIcon from '@icon/search.svg';
import trashIcon from '@icon/trash.svg';
import downloadIcon from '@icon/download.svg';

export default function TableHeader( props ) {
	const {
		id,
		responses,
		selectedRowKeys,
		setSelectedRowKeys,
		handleTableChange,
		handleSearch,
		activeTab,
		setActiveTab,
		visibleColumns,
		setVisibleColumns,
		setFieldColumnHide,
		responseFields,
		handleActivateDeleteFormModal,
		downloadItems,
		handleDownload,
	} = props;

	// Handle Tab Change
	function handleTabChange( key ) {
		setActiveTab( key );
	}

	// Handle Filter
	function handleFilter() {
		console.log( 'Filter clicked' );
	}

	// Handle Refresh
	function handleRefresh() {
		handleTableChange();
	}

	// Handle column checkbox change
	function handleColumnCheckbox( e, name ) {
		setVisibleColumns( ( prevState ) => {
			if ( e.target.checked ) {
				setFieldColumnHide( false );
				return [ ...prevState, name ];
			} else {
				setFieldColumnHide( name );
				return prevState.filter( ( item ) => item !== name );
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
			label: `Completed ${ responses ? `(${ responses.length })` : '' }`,
		},
		// {
		// 	key: 'partial',
		// 	label: `Partial (${ responses?.length })`,
		// },
	];

	const [ open, setOpen ] = useState( false );
	const handleMenuClick = ( e ) => {
		if ( e.key === '3' ) {
			setOpen( false );
		}
	};
	const handleOpenChange = ( nextOpen, info ) => {
		if ( info.source === 'trigger' || nextOpen ) {
			setOpen( nextOpen );
		}
	};

	return (
		<TableHeaderStyle className="formgent-table-header">
			{ selectedRowKeys.length !== 0 ? (
				<TableActionStyle className="formgent-table-header__action">
					<div className="formgent-table-header__selection">
						<span className="formgent-table-header__selection__text">
							{ selectedRowKeys.length } response selected
							<button
								className="formgent-table-header__selection__clear"
								onClick={ handleClearSelection }
							>
								<ReactSVG
									width="12"
									height="12"
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
						overlayStyle={ { width: 210 } }
					>
						<AntButton
							onClick={ ( e ) => e.preventDefault() }
							icon={
								<ReactSVG
									width="16"
									height="16"
									src={ downloadIcon }
								/>
							}
						/>
					</AntDropdown>

					{ /* <AntButton
						onClick={ handlePrint }
						icon={
							<ReactSVG
								width="16"
								height="16"
								src={ printIcon }
							/>
						}
					/> */ }
					<AntButton
						onClick={ handleActivateDeleteFormModal }
						icon={
							<ReactSVG
								width="16"
								height="16"
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
					allowClear
					onChange={ ( e ) => handleSearch( e.target.value ) }
					className="formgent-table-header__search"
				/>

				{ /* <AntButton
					onClick={ handleFilter }
					icon={
						<ReactSVG width="16" height="16" src={ filterIcon } />
					}
				>
					Filters
				</AntButton> */ }

				{ selectedRowKeys.length === 0 ? (
					<>
						<div className="formgent-table-header__dropdown">
							<div className="formgent-table-header__dropdown__toggle">
								<ReactSVG
									width="16"
									height="16"
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
												field.name
											) }
											onChange={ ( e ) =>
												handleColumnCheckbox(
													e,
													field.name
												)
											}
										>
											{ field.label.replace(
												/<\/?[^>]+(>|$)/g,
												''
											) }
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
							overlayStyle={ { width: 210 } }
							onOpenChange={ handleOpenChange }
							open={ open }
						>
							<AntButton
								onClick={ ( e ) => e.preventDefault() }
								icon={
									<ReactSVG
										width="16"
										height="16"
										src={ downloadIcon }
									/>
								}
							/>
						</AntDropdown>

						<AntButton
							onClick={ handleRefresh }
							icon={
								<ReactSVG
									width="16"
									height="16"
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
