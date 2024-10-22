import { Modal } from '@wordpress/components';
import { AntButton } from '@formgent/components';
import { ModalAlertStyle } from './style';
import { __ } from '@wordpress/i18n';

export default function PopUp( props ) {
	const {
		children,
		title,
		className,
		AlertContent,
		onCancel,
		onFooterCancel,
		onSubmit,
		hasCancelButton,
		hasSubmitButton,
		isDisableAction,
		submitText,
		cancelText,
		cancelBtnType,
		submitBtnType = 'danger',
		isDismissible,
	} = props;
	return (
		<Modal
			title={ title }
			overlayClassName={ `formgent-modal formgent-modal-default ${ className }` }
			onRequestClose={ onCancel }
			isDismissible={ isDismissible }
		>
			<ModalAlertStyle className={ `${ className }__modal` }>
				{ children }
				{ ! isDisableAction && (
					<div
						className={ `formgent-modal-action ${ className }-action` }
					>
						{ hasCancelButton && (
							<AntButton
								ghost
								className="formgent-modal-cancel-btn"
								onClick={ ( e ) => {
									e.preventDefault();
									onFooterCancel
										? onFooterCancel()
										: onCancel();
								} }
							>
								{ cancelText || __( 'Cancel', 'formgent' ) }
							</AntButton>
						) }
						{ hasSubmitButton && (
							<AntButton
								type="primary"
								onClick={ ( e ) => {
									e.preventDefault();
									onSubmit();
								} }
								danger
							>
								{ submitText }
							</AntButton>
						) }
					</div>
				) }
			</ModalAlertStyle>
		</Modal>
	);
}
