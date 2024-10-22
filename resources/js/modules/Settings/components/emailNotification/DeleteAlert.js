import { DeleteAlertStyle } from './style';
import { __ } from '@wordpress/i18n';

export default function DeleteAlert( props ) {
	const { title, errorMessage } = props;
	return (
		<DeleteAlertStyle>
			{ errorMessage && (
				<span className="helpgent-notice helpgent-notice-danger">
					{ errorMessage }
				</span>
			) }

			<div className="helpgent-alert-content">
				<div>
					{ __( 'You are about to delete', 'formgent' ) }{ ' ' }
					<strong>{ title }</strong>
				</div>
				<h4>
					{ __(
						'Are you sure you want to proceed with the deletion?',
						'formgent'
					) }
				</h4>
			</div>
		</DeleteAlertStyle>
	);
}
