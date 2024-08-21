import { useState, useEffect } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import { Modal } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import PropTypes from 'prop-types';
import ReactSVG from 'react-inlinesvg';
import CreateFormModalContent from './CreateFormModalContent';

export default function CreatePopupAction( props ) {
	const { CommonReducer } = useSelect( ( select ) => {
		return select( 'formgent' ).getCommonState();
	}, [] );

	const { updateSingleFormType, updateCreatePopupStage } =
		useDispatch( 'formgent' );

	const { Link, useParams } = CommonReducer.routerComponents;

	const { item, setStep } = props;

	function handleFormAction() {
		updateSingleFormType( item.type );
		updateCreatePopupStage( 'scratch' );
		setStep( '2' );
	}

	const [ isModalVisible, setIsModalVisible ] = useState( false );

	function handleCreateFormModal() {
		setIsModalVisible( true );
	}
	function closeModal() {
		setIsModalVisible( false );
	}

	const { id } = useParams();

	const { singleForm } = useSelect(
		( select ) => {
			return { singleForm: select( 'formgent' ).getSingleForm( id ) };
		},
		[ id ]
	);

	const { selectForm } = useDispatch( 'formgent' );

	useEffect( () => {
		selectForm( id );
	}, [ id ] );

	return (
		<>
			{ item.url ? (
				<Link
					to={ '#' }
					className="formgent-createPopup__action"
					onClick={ handleCreateFormModal }
				>
					<div className="formgent-createPopup__action-icon">
						<div className="formgent-createPopup__action-icon-wrap">
							<ReactSVG src={ item.icon } />
						</div>
					</div>
					{ item.label && (
						<span className="formgent-createPopup__action-label">
							{ item.label }
						</span>
					) }
					{ item.text && (
						<span className="formgent-createPopup__action-text">
							{ item.text }
						</span>
					) }
				</Link>
			) : (
				<span
					className="formgent-createPopup__action"
					onClick={ () => handleFormAction() }
				>
					<div className="formgent-createPopup__action-icon">
						<div className="formgent-createPopup__action-icon-wrap">
							<ReactSVG src={ item.icon } />
						</div>
					</div>
					{ item.label && (
						<span className="formgent-createPopup__action-label">
							{ item.label }
						</span>
					) }
					{ item.text && (
						<span className="formgent-createPopup__action-text">
							{ item.text }
						</span>
					) }
				</span>
			) }

			{ isModalVisible && ! singleForm?.title && (
				<Modal
					overlayClassName="formgent-modal formgent-form-title-modal"
					size="medium"
					isDismissible={ true }
					onRequestClose={ closeModal }
				>
					<CreateFormModalContent type={ item.type } />
				</Modal>
			) }
		</>
	);
}

CreatePopupAction.propTypes = {
	item: PropTypes.object,
	setStep: PropTypes.func,
};
