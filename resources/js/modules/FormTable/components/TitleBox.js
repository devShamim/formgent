import { useSelect, useDispatch } from '@wordpress/data';
import { doAction } from '@wordpress/hooks';
import { AntInput } from '@formgent/components';
import { formatDate } from '@formgent/helper/utils';
import { __ } from '@wordpress/i18n';
import { TitleBoxStyle } from './style';
import ReactSVG from 'react-inlinesvg';
import times from '@icon/times.svg';
import check from '@icon/check.svg';
import formIcon from '@icon/form.svg';
import patchData from '@formgent/helper/patchData';

export default function TItleBox( props ) {
	const { form, form_edit_url, editableForm, setEditableForm } = props;
	const { id, title, created_at, preview_url } = form;

	const { updateTitleRequest, updateTitleSuccess, updateTitleError } =
		useDispatch( 'formgent' );

	const dateFormatOptions = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	};

	const { CommonReducer } = useSelect( ( select ) => {
		return select( 'formgent' ).getCommonState();
	}, [] );

	const { isTitleUpdating } = false;

	const { Link } = CommonReducer.routerComponents;

	function handleCancelEditMode() {
		setEditableForm( null );
	}

	function handleUpdateEditableForm( e ) {
		setEditableForm( {
			...editableForm,
			title: e.target.value,
		} );
	}

	async function handleUpdateFormTitle() {
		if ( title === editableForm.title ) {
			setEditableForm( null );
			return;
		}
		if ( isTitleUpdating ) return;
		updateTitleRequest();
		try {
			const titleUpdateResponse = await patchData(
				`admin/forms/${ editableForm.id }/title`,
				{ title: editableForm.title }
			);
			doAction( 'formgent-toast', {
				message: titleUpdateResponse.message,
			} );
			updateTitleSuccess( editableForm );
		} catch ( error ) {
			updateTitleError( error );
		}
		setEditableForm( null );
	}

	return (
		<TitleBoxStyle className="formgent-titleBox">
			{ editableForm && editableForm.id === id ? (
				<div className="formgent-titleBox__editor">
					<div className="formgent-titleBox__data">
						<AntInput
							tokens={ { colorBorder: '#ededed' } }
							value={ editableForm.title }
							onChange={ handleUpdateEditableForm }
							onKeyUp={ ( e ) => {
								if ( e.key === 'Enter' ) {
									handleUpdateFormTitle();
								}
							} }
						/>
					</div>
					<div className="formgent-titleBox__actions">
						<span
							className="formgent-titleBox-action-item formgent-titleBox__actions-cancel"
							onClick={ handleCancelEditMode }
						>
							<ReactSVG src={ times } />
						</span>
						<span
							className="formgent-titleBox-action-item formgent-titleBox__actions-yes"
							onClick={ handleUpdateFormTitle }
						>
							{ isTitleUpdating ? (
								<span className="formgent-circle-loader"></span>
							) : (
								<ReactSVG src={ check } />
							) }
						</span>
					</div>
				</div>
			) : (
				<div className="formgent-titlebox__content">
					<div className="formgent-titleBox-icon">
						<ReactSVG src={ formIcon } />
					</div>
					<div className="formgent-titleBox-text">
						<Link
							onClick={ () => {
								window.location.href = `${ form_edit_url }&post=${ id }`;
							} }
						>
							<span className="formgent-title">{ title }</span>
						</Link>
						<ul className="formgent-titleBox-meta">
							<li className="formgent-titleBox-meta__id">
								{ __( 'ID', 'formgent' ) } #{ id }
							</li>
							<li className="formgent-titleBox-meta__date">
								{ __( 'Created:', 'formgent' ) }{ ' ' }
								{ formatDate(
									'en-US',
									created_at,
									dateFormatOptions,
									false
								) }
							</li>
						</ul>
						<ul className="formgent-form-action">
							<li className="formgent-form-action__items">
								<Link
									onClick={ () => {
										window.location.href = `${ form_edit_url }&post=${ id }`;
									} }
									className="formgent-btn formgent-btn-xxs formgent-btn-light-gray"
								>
									{ __( 'Edit', 'formgent' ) }
								</Link>
							</li>
							<li>
								<Link
									to={ `/forms/${ id }/response` }
									className={ `formgent-btn formgent-btn-xxs formgent-btn-light-gray` }
								>
									{ __( 'All Responses', 'formgent' ) }
								</Link>
							</li>
							<li>
								<a
									href={ preview_url }
									className={ `formgent-btn formgent-btn-xxs formgent-btn-light-gray` }
									target="_blank"
								>
									{ __( 'Preview', 'formgent' ) }
								</a>
							</li>
						</ul>
					</div>
				</div>
			) }
		</TitleBoxStyle>
	);
}
