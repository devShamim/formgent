import { AntButton, AntDropdown, AntTabs } from '@formgent/components';
import deleteData from '@formgent/helper/deleteData';
import patchData from '@formgent/helper/patchData';
import postData from '@formgent/helper/postData';
import { formatDate } from '@formgent/helper/utils';
import { useState } from '@wordpress/element';
import ReactSVG from 'react-inlinesvg';
import { TableDrawerStyle, TableTabStyle } from './style';

// Icon
import alignRightIcon from '@icon/align-right.svg';
import arrowLeftIcon from '@icon/arrow-left.svg';
import arrowRightIcon from '@icon/arrow-right.svg';
import checkIcon from '@icon/check-square.svg';
import closeIcon from '@icon/close.svg';
import downloadIcon from '@icon/download.svg';
import editIcon from '@icon/edit.svg';
import ellipsisVIcon from '@icon/ellipsis-v.svg';
import mailIcon from '@icon/mail.svg';
import plusIcon from '@icon/plus.svg';
import starIcon from '@icon/star.svg';
import targetIcon from '@icon/target.svg';
import trashIcon from '@icon/trash.svg';

export default function TableDrawer( props ) {
	const {
		response,
		handleTableDrawer,
		responseNotes,
		setTableDrawer,
		pagination,
		handleDelete,
		handleStarred,
		handleRead,
		handleDownload,
		downloadItems,
		dateFormatOptions,
	} = props;
	const [ activeDrawerTab, setActiveDrawerTab ] = useState( 'answers' );
	const [ enableSubmissionInput, setEnableSubmissionInput ] =
		useState( false );
	const [ currentNote, setCurrentNote ] = useState( '' );

	// Drawer Tab Items
	const drawerTabItems = [
		{
			key: 'answers',
			label: 'Answers',
		},
		{
			key: 'submission',
			label: 'Submission Info',
		},
	];

	// Select Items Data
	const selectItems = [
		{
			label: (
				<span className="dropdown-header-content">
					<ReactSVG width="14" height="14" src={ starIcon } />
					Star
				</span>
			),
			key: 'star',
		},
		{
			label: (
				<span className="dropdown-header-content">
					<ReactSVG width="14" height="14" src={ mailIcon } />
					Read/Unread
				</span>
			),
			key: 'read-unread',
		},
		{
			label: (
				<span className="dropdown-header-content">
					<ReactSVG width="14" height="14" src={ trashIcon } />
					Delete
				</span>
			),
			key: 'delete',
		},
	];

	// Select Note Items Data
	const selectItemsNote = [
		{
			label: (
				<span className="dropdown-header-content">
					<ReactSVG width="14" height="14" src={ editIcon } />
					Edit
				</span>
			),
			key: 'edit',
		},
		{
			label: (
				<span className="dropdown-header-content">
					<ReactSVG width="14" height="14" src={ trashIcon } />
					Delete
				</span>
			),
			key: 'delete',
		},
	];

	// Note Action Functions
	async function handleNoteCreate() {
		const createNote = await postData( 'admin/responses/notes', {
			response_id: Number( response.id ),
			note: currentNote,
		} );

		if ( createNote ) {
			handleTableDrawer( response.id );
		}
	}

	async function handleNoteEdit( id, value ) {
		const updateNote = await patchData(
			`admin/responses/notes/${ Number( id ) }`,
			{
				response_id: Number( response.id ),
				note: currentNote,
			}
		);

		if ( updateNote ) {
			handleTableDrawer( response.id );
		}
	}

	async function handleNoteDelete( id ) {
		const deleteNote = await deleteData(
			`admin/responses/notes/${ Number( id ) }`,
			{
				response_id: Number( response.id ),
			}
		);

		if ( deleteNote ) {
			handleTableDrawer( response.id );
		}
	}

	// handleSelectItems
	function handleSelectItems( { key } ) {
		const selectFunctions = {
			star: () => {
				handleStarred(
					response.id,
					response.is_starred === '1' ? true : false
				);
			},
			'read-unread': () => {
				handleRead(
					response.id,
					response.is_read === '1' ? true : false
				);
			},
			delete: () => {
				handleDelete( [ response.id ] );
			},
		};

		// Get the sorted data based on the key
		return selectFunctions[ key ] ? selectFunctions[ key ]() : null;
	}

	// handleSelectItems
	function handleSelectItemsNote( { key }, id, value ) {
		const selectFunctionsNote = {
			edit: () => {
				setEnableSubmissionInput( id );
				setCurrentNote( value );
			},
			delete: () => {
				handleNoteDelete( id );
			},
		};

		// Get the sorted data based on the key
		return selectFunctionsNote[ key ] ? selectFunctionsNote[ key ]() : null;
	}

	// Handle Drawer Tab Change
	function handleDrawerTabChange( key ) {
		setActiveDrawerTab( key );
	}

	async function handleNoteFormSubmit( e ) {
		e.preventDefault();
		const status = enableSubmissionInput === 'create' ? 'create' : 'edit';

		if ( status === 'create' ) {
			// Handle the creation of a new note
			handleNoteCreate();
			setEnableSubmissionInput( false );
		} else {
			// Handle the update of an existing note
			handleNoteEdit( enableSubmissionInput, currentNote );
			setEnableSubmissionInput( false );
		}
	}

	return (
		<TableDrawerStyle className="response-table__drawer">
			<div className="response-table__drawer__header">
				<div className="response-table__drawer__header__response">
					<div className="response-table__drawer__header__response__btns">
						<button
							className={ `response-table__drawer__header__response__btn ${
								pagination.current_page <= 1 ? 'disabled' : ''
							}` }
							onClick={ () => {
								handleTableDrawer( response.id, 'prev' );
							} }
						>
							<ReactSVG
								width="14"
								height="14"
								src={ arrowLeftIcon }
							/>
						</button>
						<button
							className={ `response-table__drawer__header__response__btn ${
								pagination.current_page ===
								pagination.total_pages
									? 'disabled'
									: ''
							}` }
							onClick={ () => {
								handleTableDrawer( response.id, 'next' );
							} }
						>
							<ReactSVG
								width="14"
								height="14"
								src={ arrowRightIcon }
							/>
						</button>
					</div>
					<span className="">
						{ pagination.current_page } of{ ' ' }
						{ pagination.total_pages } Responses
					</span>
				</div>
				<div className="response-table__drawer__header__action">
					<AntDropdown
						menu={ {
							items: downloadItems,
							onClick: handleDownload,
						} }
						overlayStyle={ { width: 210 } }
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

					<div className="response-table__drawer__header__dropdown">
						<AntDropdown
							menu={ {
								items: selectItems,
								onClick: handleSelectItems,
							} }
							trigger={ [ 'click' ] }
							placement="bottomLeft"
							overlayStyle={ { minWidth: '240px' } }
						>
							<button
								className="response-table__drawer__header__action__btn"
								onClick={ ( e ) => e.preventDefault() }
							>
								<ReactSVG
									width="14"
									height="14"
									src={ ellipsisVIcon }
								/>
							</button>
						</AntDropdown>
					</div>
					<button
						className="response-table__drawer__close"
						onClick={ () => {
							setTableDrawer( false );
						} }
					>
						<ReactSVG width="14" height="14" src={ closeIcon } />
					</button>
				</div>
			</div>
			<div className="response-table__drawer__content">
				<div className="response-table__drawer__tab">
					<TableTabStyle>
						<AntTabs
							activeKey={ activeDrawerTab }
							onChange={ handleDrawerTabChange }
							items={ drawerTabItems }
						/>
					</TableTabStyle>
					{ activeDrawerTab === 'answers' && (
						<div className="response-table__drawer__tab__content">
							<div className="response-table__drawer__tab__wrapper">
								<div className="response-table__drawer__tab__item">
									<div className="response-table__drawer__tab__item__icon">
										<ReactSVG
											width="20"
											height="20"
											src={ alignRightIcon }
										/>
									</div>
									<div className="response-table__drawer__tab__item__content">
										<h5 className="response-table__drawer__tab__item__title">
											Show question title here
										</h5>
										<p className="response-table__drawer__tab__item__desc">
											Lorem ipsum dolor sit amet
											consectetur. Suspendisse morbi
											mattis gravida aliquet nunc suscipit
											aliquam. Turpis sed id elementum
											auctor.
										</p>
									</div>
								</div>
								<div className="response-table__drawer__tab__item">
									<div className="response-table__drawer__tab__item__icon">
										<ReactSVG
											width="20"
											height="20"
											src={ checkIcon }
										/>
									</div>
									<div className="response-table__drawer__tab__item__content">
										<h5 className="response-table__drawer__tab__item__title">
											Select multiple answers
										</h5>
										<div className="response-table__drawer__tab__item__btns">
											<button className="response-table__drawer__tab__item__btn">
												Option One
											</button>
											<button className="response-table__drawer__tab__item__btn">
												Option Two
											</button>
										</div>
									</div>
								</div>
								<div className="response-table__drawer__tab__item">
									<div className="response-table__drawer__tab__item__icon">
										<ReactSVG
											width="20"
											height="20"
											src={ targetIcon }
										/>
									</div>
									<div className="response-table__drawer__tab__item__content">
										<h5 className="response-table__drawer__tab__item__title">
											Select your answers
										</h5>
										<div className="response-table__drawer__tab__item__btns">
											<button className="response-table__drawer__tab__item__btn">
												Yes
											</button>
										</div>
									</div>
								</div>
							</div>
							<div className="response-table__drawer__tab__submission">
								<div className="response-table__drawer__tab__submission__header">
									<h4 className="response-table__drawer__tab__submission__title">
										Submission Note
									</h4>
									{ ! enableSubmissionInput ? (
										<button
											className="response-table__drawer__tab__submission__add"
											onClick={ () => {
												setEnableSubmissionInput(
													'create'
												);
												setCurrentNote( '' );
											} }
										>
											<ReactSVG
												width="16"
												height="16"
												src={ plusIcon }
											/>
											Add Note
										</button>
									) : (
										<button
											className="response-table__drawer__tab__submission__add cancel"
											onClick={ () => {
												setEnableSubmissionInput(
													false
												);
												setCurrentNote( '' );
											} }
										>
											<ReactSVG
												width="16"
												height="16"
												src={ closeIcon }
											/>
											Cancel
										</button>
									) }
								</div>
								{ enableSubmissionInput ? (
									<form className="response-table__drawer__tab__submission__note">
										<textarea
											placeholder="You can create your note here..."
											className="response-table__drawer__tab__submission__input"
											onChange={ ( e ) =>
												setCurrentNote( e.target.value )
											}
											value={ currentNote }
										/>
										<button
											className="response-table__drawer__tab__submission__save"
											onClick={ ( e ) =>
												handleNoteFormSubmit( e )
											}
											disabled={ ! currentNote }
										>
											Save note
										</button>
									</form>
								) : (
									<div className="response-table__drawer__tab__submission__content">
										{ responseNotes &&
											responseNotes.map(
												( note, index ) => {
													return (
														<div
															key={ index }
															className="response-table__drawer__tab__submission__content__single"
														>
															<div className="response-table__drawer__tab__submission__content__wrapper">
																<span className="response-table__drawer__tab__submission__content__published-date">
																	{ formatDate(
																		'en-US',
																		note.created_at,
																		dateFormatOptions
																	) }
																</span>
																<p className="response-table__drawer__tab__submission__content__text">
																	{
																		note.note
																	}
																</p>
															</div>
															<AntDropdown
																menu={ {
																	items: selectItemsNote,
																	onClick: (
																		e
																	) =>
																		handleSelectItemsNote(
																			e,
																			note.id,
																			note.note
																		),
																} }
																trigger={ [
																	'click',
																] }
																placement="bottomLeft"
																overlayStyle={ {
																	minWidth:
																		'240px',
																} }
															>
																<button
																	className="response-table__drawer__tab__submission__content__btn"
																	onClick={ (
																		e
																	) =>
																		e.preventDefault()
																	}
																>
																	<ReactSVG
																		width="14"
																		height="14"
																		src={
																			ellipsisVIcon
																		}
																	/>
																</button>
															</AntDropdown>
														</div>
													);
												}
											) }
									</div>
								) }
							</div>
						</div>
					) }
					{ activeDrawerTab === 'submission' && (
						<div className="response-table__drawer__tab__content">
							<div className="response-table__drawer__tab__info">
								<div className="response-table__drawer__tab__info__single">
									<span className="response-table__drawer__tab__info__title">
										Submission Date
									</span>
									<span className="response-table__drawer__tab__info__value">
										{ formatDate(
											'en-US',
											response.created_at,
											dateFormatOptions
										) }
									</span>
								</div>
								<div className="response-table__drawer__tab__info__single">
									<span className="response-table__drawer__tab__info__title">
										Username
									</span>
									<span className="response-table__drawer__tab__info__value">
										{ response.user_name || 'Default User' }
									</span>
								</div>
								<div className="response-table__drawer__tab__info__single">
									<span className="response-table__drawer__tab__info__title">
										User Email
									</span>
									<span className="response-table__drawer__tab__info__value">
										{ response.user_email ||
											'Default Mail' }
									</span>
								</div>
								<div className="response-table__drawer__tab__info__single">
									<span className="response-table__drawer__tab__info__title">
										Status
									</span>
									<span className="response-table__drawer__tab__info__value">
										<span
											className={ `response-table__drawer__tab__info__tag ${
												response.is_completed === '1'
													? 'completed'
													: null
											}` }
										>
											{ response.is_completed === '1'
												? 'Completed'
												: 'In Progress' }
										</span>
									</span>
								</div>
								<div className="response-table__drawer__tab__info__single">
									<span className="response-table__drawer__tab__info__title">
										Browser
									</span>
									<span className="response-table__drawer__tab__info__value">
										<span>
											{ response.browser ||
												'Default Browser' }
										</span>
										<span>
											{ response.browser_version ||
												'Default Version' }
										</span>
									</span>
								</div>
								<div className="response-table__drawer__tab__info__single">
									<span className="response-table__drawer__tab__info__title">
										Operating System
									</span>
									<span className="response-table__drawer__tab__info__value">
										{ response.device || 'Default Device' }
									</span>
								</div>
							</div>
						</div>
					) }
				</div>
			</div>
		</TableDrawerStyle>
	);
}
