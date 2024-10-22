import { AntDropdown, AntTabs } from '@formgent/components';
import PopUp from '@formgent/components/PopUp';
import deleteData from '@formgent/helper/deleteData';
import patchData from '@formgent/helper/patchData';
import postData from '@formgent/helper/postData';
import { useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import ReactSVG from 'react-inlinesvg';
import { TableDrawerStyle, TableTabStyle } from './style';

// Icon
import { formatDate } from '@formgent/helper/utils';
import alignLeftIcon from '@icon/align-left.svg';
import alignRightIcon from '@icon/align-right.svg';
import arrowLeftIcon from '@icon/arrow-left.svg';
import arrowRightIcon from '@icon/arrow-right.svg';
import closeIcon from '@icon/close.svg';
import downloadIcon from '@icon/download.svg';
import editIcon from '@icon/edit.svg';
import ellipsisVIcon from '@icon/ellipsis-v.svg';
import hashIcon from '@icon/hash.svg';
import linkIcon from '@icon/link.svg';
import mailIcon from '@icon/mail.svg';
import phoneIcon from '@icon/phone.svg';
import plusIcon from '@icon/plus.svg';
import starIcon from '@icon/star.svg';
import textIcon from '@icon/text.svg';
import trashAltIcon from '@icon/trash-alt.svg';
import trashIcon from '@icon/trash.svg';
import FormDeleteAlert from './FormDeleteAlert';

export default function TableDrawer( props ) {
	const {
		response,
		handleTableDrawer,
		notes,
		handleResponseNotes,
		addResponseNotes,
		updateResponseNotes,
		deleteResponseNotes,
		handleDrawerClose,
		single_response_pagination,
		handleActivateDeleteFormModal,
		handleStarred,
		handleRead,
		handleDownload,
		dateFormatOptions,
		drawerLoading,
		setDrawerLoading,
	} = props;

	const [ activeDrawer, setActiveDrawer ] = useState( '' );
	const [ activeNav, setActiveNav ] = useState( '' );
	const [ activeDrawerTab, setActiveDrawerTab ] = useState( 'answers' );
	const [ enableSubmissionInput, setEnableSubmissionInput ] =
		useState( false );
	const [ currentNote, setCurrentNote ] = useState( '' );
	const [ currentNoteID, setCurrentNoteID ] = useState( [] );
	const [ isNoteDeleting, setIsNoteDeleting ] = useState( '' );
	const [ deleteModalOpen, setDeleteModalOpen ] = useState( false );

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
			addResponseNotes( createNote );
			handleResponseNotes( response.id );
		}
	}

	async function handleNoteEdit( id ) {
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

	async function handleNoteDelete() {
		// Check before setting the state to avoid redundant calls
		if ( isNoteDeleting ) {
			return;
		}

		setIsNoteDeleting( true );

		try {
			const deleteNote = await deleteData(
				`admin/responses/notes/${ Number( currentNoteID ) }`,
				{
					response_id: Number( response.id ),
				}
			);

			if ( deleteNote ) {
				deleteResponseNotes( currentNoteID );
				handleTableDrawer( response.id );
			}
		} catch ( error ) {
			console.error( 'Error deleting note:', error );
		} finally {
			// Ensure these states are reset regardless of success or error
			setIsNoteDeleting( false );
			setDeleteModalOpen( false );
		}
	}

	function handleActivateNoteDeleteAlert() {
		setDeleteModalOpen( true );
	}
	function handleCancelNoteDeleteAlert() {
		setDeleteModalOpen( false );
		setIsNoteDeleting( false );
	}

	// handleSelectItems
	function handleSelectItems( { key } ) {
		const selectFunctions = {
			star: () => {
				setActiveNav( '' );
				handleStarred(
					response.id,
					response.is_starred === '1' ? '1' : '0'
				);
			},
			'read-unread': () => {
				setActiveNav( '' );
				handleRead( response.id, response.is_read === '1' ? '1' : '0' );
			},
			delete: () => {
				setActiveNav( '' );
				handleActivateDeleteFormModal( [ response.id ] );
			},
		};

		// Get the sorted data based on the key
		return selectFunctions[ key ] ? selectFunctions[ key ]() : null;
	}

	// handleSelectItems
	function handleSelectItemsNote( { key }, id, value ) {
		setCurrentNoteID( id );
		const selectFunctionsNote = {
			edit: () => {
				setEnableSubmissionInput( id );
				setCurrentNote( value );
				updateResponseNotes( id, value );
			},
			delete: () => {
				handleActivateNoteDeleteAlert();
			},
		};

		// Get the sorted data based on the key
		return selectFunctionsNote[ key ] ? selectFunctionsNote[ key ]() : null;
	}

	function handleAnswerIcon( type ) {
		const answerIcon = {
			email: mailIcon,
			text: textIcon,
			textarea: alignLeftIcon,
			number: hashIcon,
			'phone-number': phoneIcon,
			website: linkIcon,
		};

		return answerIcon[ type ] || alignRightIcon;
	}

	// Handle Drawer Tab Change
	function handleDrawerTabChange( key ) {
		setActiveDrawerTab( key );
	}

	async function handleNoteFormSubmit( e ) {
		e.preventDefault();
		setDrawerLoading( true );
		const status = enableSubmissionInput === 'create' ? 'create' : 'edit';

		if ( status === 'create' ) {
			// Handle the creation of a new note
			handleNoteCreate();
			setEnableSubmissionInput( false );
		} else {
			// Handle the update of an existing note
			handleNoteEdit( enableSubmissionInput );
			setEnableSubmissionInput( false );
		}
	}

	useEffect( () => {
		if ( notes ) {
			setDrawerLoading( false );
			setIsNoteDeleting( false );
		}
	}, [ notes ] );

	return (
		<TableDrawerStyle className="response-table__drawer">
			<div className="response-table__drawer__header">
				<div className="response-table__drawer__header__response">
					<div className="response-table__drawer__header__response__btns">
						{ drawerLoading && activeNav === 'prev' ? (
							<button
								className={ `response-table__drawer__header__response__btn formgent-loading ${
									single_response_pagination?.current_page <=
									1
										? 'disabled'
										: ''
								}` }
								onClick={ () => {
									handleTableDrawer( response.id, 'prev' );
									setActiveDrawer( response.id );
									setActiveNav( 'prev' );
								} }
							/>
						) : (
							<button
								className={ `response-table__drawer__header__response__btn ${
									single_response_pagination?.current_page <=
									1
										? 'disabled'
										: ''
								}` }
								onClick={ () => {
									handleTableDrawer( response.id, 'prev' );
									setActiveDrawer( response.id );
									setActiveNav( 'prev' );
								} }
							>
								<ReactSVG
									width="14"
									height="14"
									src={ arrowLeftIcon }
								/>
							</button>
						) }
						{ drawerLoading && activeNav === 'next' ? (
							<button
								className={ `response-table__drawer__header__response__btn formgent-loading ${
									single_response_pagination?.current_page ===
									single_response_pagination?.total_pages
										? 'disabled'
										: ''
								}` }
								onClick={ () => {
									handleTableDrawer( response.id, 'next' );
									setActiveDrawer( response.id );
									setActiveNav( 'next' );
								} }
							/>
						) : (
							<button
								className={ `response-table__drawer__header__response__btn ${
									single_response_pagination?.current_page ===
									single_response_pagination?.total_pages
										? 'disabled'
										: ''
								}` }
								onClick={ () => {
									handleTableDrawer( response.id, 'next' );
									setActiveDrawer( response.id );
									setActiveNav( 'next' );
								} }
							>
								<ReactSVG
									width="14"
									height="14"
									src={ arrowRightIcon }
								/>
							</button>
						) }
					</div>
					<span
						className={
							! single_response_pagination
								? 'formgent-loading'
								: ''
						}
					>
						{ single_response_pagination?.current_page } of{ ' ' }
						{ single_response_pagination?.total_pages } Responses
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
						<button
							className="response-table__drawer__header__action__btn"
							onClick={ ( e ) => e.preventDefault() }
						>
							<ReactSVG
								width="14"
								height="14"
								src={ downloadIcon }
							/>
						</button>
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
							handleDrawerClose();
						} }
					>
						<ReactSVG width="14" height="14" src={ closeIcon } />
					</button>
				</div>
			</div>
			<div
				className={ `response-table__drawer__content ${
					drawerLoading ? 'formgent-loading' : ''
				} ` }
			>
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
								{ response?.answers.map( ( answer, index ) => {
									return (
										<div
											key={ index }
											className="response-table__drawer__tab__item"
										>
											<div className="response-table__drawer__tab__item__icon">
												<ReactSVG
													width="20"
													height="20"
													src={ handleAnswerIcon(
														answer.field_type
													) }
												/>
											</div>
											<div className="response-table__drawer__tab__item__content">
												<h5 className="response-table__drawer__tab__item__title">
													{ answer.label ||
														answer.field_name }
												</h5>
												{ answer.children.length ? (
													answer.children.map(
														( child, index ) => {
															return (
																<div
																	key={
																		index
																	}
																	className="response-table__drawer__tab__item__desc__child"
																>
																	<span className="response-table__drawer__tab__item__desc__key">
																		{
																			child.label
																		}
																	</span>{ ' ' }
																	:{ ' ' }
																	<span className="response-table__drawer__tab__item__desc__value">
																		{
																			child.value
																		}
																	</span>
																</div>
															);
														}
													)
												) : (
													<p className="response-table__drawer__tab__item__desc">
														{ answer.value }
													</p>
												) }
											</div>
										</div>
									);
								} ) }
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
										{ notes &&
											notes.map( ( note, index ) => {
												return (
													<div
														key={ index }
														className="response-table__drawer__tab__submission__content__single"
													>
														<div className="response-table__drawer__tab__submission__content__wrapper">
															<span className="response-table__drawer__tab__submission__content__published-date">
																{ note.created_at &&
																	formatDate(
																		'en-US',
																		note.created_at,
																		dateFormatOptions
																	) }
															</span>
															<p className="response-table__drawer__tab__submission__content__text">
																{ note.note }
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
											} ) }
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
										{ response.username || '' }
									</span>
								</div>
								<div className="response-table__drawer__tab__info__single">
									<span className="response-table__drawer__tab__info__title">
										User Email
									</span>
									<span className="response-table__drawer__tab__info__value">
										{ response.user_email || '' }
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
										<span>{ response.browser || '' }</span>
										<span>
											{ response.browser_version || '' }
										</span>
									</span>
								</div>
								<div className="response-table__drawer__tab__info__single">
									<span className="response-table__drawer__tab__info__title">
										IP Address
									</span>
									<span className="response-table__drawer__tab__info__value">
										{ response.ip || '' }
									</span>
								</div>
								<div className="response-table__drawer__tab__info__single">
									<span className="response-table__drawer__tab__info__title">
										Operating System
									</span>
									<span className="response-table__drawer__tab__info__value">
										{ response.device || '' }
									</span>
								</div>
							</div>
						</div>
					) }
				</div>
			</div>

			{ deleteModalOpen && (
				<PopUp
					open={ deleteModalOpen }
					title={
						<>
							<span className="formgent-popup-title-icon">
								<ReactSVG
									src={ trashAltIcon }
									width="24"
									height="24"
								/>
							</span>
							{ __( 'Delete Note?', 'formgent' ) }
						</>
					}
					onCancel={ handleCancelNoteDeleteAlert }
					onSubmit={ handleNoteDelete }
					hasCancelButton
					hasSubmitButton
					isActiveSubmit
					submitText={
						isNoteDeleting
							? __( 'Deleting', 'formgent' )
							: __( 'Delete', 'formgent' )
					}
					className="formgent-form-delete-alert"
				>
					<FormDeleteAlert
						formTitle={ [ currentNoteID ] }
						type="note"
					/>
				</PopUp>
			) }
		</TableDrawerStyle>
	);
}
