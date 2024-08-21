//import patchData from '@formgent/helper/patchData';
import arrowLeftIcon from '@icon/arrow-small-left.svg';
import { useDispatch, useSelect } from '@wordpress/data';
import { useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import ReactSVG from 'react-inlinesvg';
import { FormHeaderStyle } from './style';

// Icon
import rowIcon from '@icon/row-3.svg';

export default function FormHeader( props ) {
	const { resultHeader } = props;

	//const [ isEditing, setIsEditing ] = useState( false );
	const [ title, setTitle ] = useState( '' );

	//const { publishFormRequest, publishFormSuccess, publishFormError } = useDispatch( 'formgent' );

	const { CommonReducer } = useSelect( ( select ) => {
		return select( 'formgent' ).getCommonState();
	}, [] );

	const { useParams, NavLink, useNavigate } = CommonReducer.routerComponents;
	const { id } = useParams();
	const navigate = useNavigate && useNavigate();

	const { SingleFormReducer } = useSelect( ( select ) => {
		return select( 'formgent' ).getSingleFormState();
	}, [] );
	const { form_title, isUpdatingForm, responses } = SingleFormReducer;

	const handleBackButtonClick = () => {
		navigate( -1 );
	};

	// const handleEditClick = () => {
	// 	setIsEditing( true );
	// };
	// const handleInputChange = ( e ) => {
	// 	setTitle( e.target.value );
	// };

	// const handleBlur = () => {
	// 	setIsEditing( false );
	// 	// Perform save action here (e.g., API call) when blurred
	// };

	// const handleSaveClick = () => {
	// 	setIsEditing( false );
	// 	// Perform save action here (e.g., API call)
	// };

	// const formPreview = () => {
	// 	console.log( 'Form Preview clicked' );
	// };

	// function formPublish() {
	// 	if ( isUpdatingForm ) return;
	// 	publishFormRequest();
	// 	try {
	// 		const updatedForm = { ...SingleFormReducer.singleForm };
	// 		const formStringyContent = JSON.stringify( {
	// 			...updatedForm.content,
	// 		} );
	// 		Object.assign(
	// 			updatedForm,
	// 			{ font_family: 'Inter' },
	// 			{ status: 'publish' },
	// 			{ content: formStringyContent }
	// 		);
	// 		const updatingStatusResponse = patchData(
	// 			`admin/forms/${ id }`,
	// 			updatedForm
	// 		);
	// 		publishFormSuccess( 'publish' );
	// 	} catch ( error ) {
	// 		console.log( error );
	// 		publishFormError( error );
	// 	}
	// }

	useEffect( () => {
		setTitle( form_title );
	}, [ form_title ] );

	const forms = `/forms/${ id }`;

	return (
		<FormHeaderStyle className="formgent-editor-header">
			<div className="formgent-editor-header__info">
				<div className="formgent-editor-header__info__redirect">
					{ /* <div className="formgent-editor-header__info__logo">
						<ReactSVG src={ favIcon } />
					</div> */ }
					<button
						className="formgent-editor-header__info__previous"
						onClick={ handleBackButtonClick }
					>
						<ReactSVG src={ arrowLeftIcon } />
						{ __( 'Back', 'formgent' ) }
					</button>
				</div>
				<span className="formgent-editor-header__info__title">
					{ title }
				</span>

				{ /* <div className="formgent-editor-header__info__wrap">
					<div className="formgent-editor-header__info__title">
						{ isEditing && (
							<ReactSVG
								src={ checkIcon }
								width="16"
								height="16"
								onClick={ handleSaveClick }
							/>
						) }
						{ isEditing ? (
							<Input
								value={ title }
								onChange={ handleInputChange }
								onBlur={ handleBlur }
								autoFocus
							/>
						) : (
							<>
								<ReactSVG
									src={ pencilIcon }
									onClick={ handleEditClick }
								/>
								<span>{ title }</span>
							</>
						) }
					</div>
					<span className="formgent-editor-header__info__status">
						<ReactSVG src={ checkIcon } />
						{ __( 'Saved in draft', 'formgent' ) }
					</span>
				</div> */ }
			</div>

			{ /* Editor Header Nav */ }
			<nav className="formgent-editor-header__nav">
				{ resultHeader ? (
					<>
						<NavLink
							to={ `${ forms }/response` }
							className="formgent-results-header__nav__link"
						>
							<ReactSVG src={ rowIcon } width="18" height="18" />
							Responses { responses && `(${ responses.length })` }
						</NavLink>
						{ /* <NavLink
							to={ `${ forms }/summary` }
							className="formgent-results-header__nav__link"
						>
							<ReactSVG src={ pieIcon } width="18" height="18" />
							Summary
						</NavLink>
						<NavLink
							to={ `${ forms }/analytics` }
							className="formgent-results-header__nav__link"
						>
							<ReactSVG
								src={ chartIcon }
								width="18"
								height="18"
							/>
							Analytics
						</NavLink> */ }
					</>
				) : (
					<>
						{ /* <NavLink to={ `${ forms }/edit` }>Editor</NavLink> */ }
						<NavLink to={ `${ forms }/settings` }>Settings</NavLink>
						<NavLink to={ `${ forms }/response` }>Response</NavLink>
					</>
				) }
			</nav>

			{ /* Editor Header Actions */ }
			<div className="formgent-editor-header__actions">
				{ /* <button
					className="formgent-editor-header__actions__button"
					onClick={ formPreview }
				>
					{ __( 'Preview', 'formgent' ) }
				</button>
				<button
					className="formgent-editor-header__actions__button active"
					onClick={ formPublish }
				>
					{ isUpdatingForm
						? __( 'Publishing', 'formgent' )
						: __( 'Publish', 'formgent' ) }
				</button> */ }
			</div>
		</FormHeaderStyle>
	);
}
