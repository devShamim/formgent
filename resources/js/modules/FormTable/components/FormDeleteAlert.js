import { FormDeleteAlertStyle } from './style';
import { __ } from '@wordpress/i18n';
export default function FormDeleteAlert( props ) {
	const { error, formTitle } = props;
	return (
		<FormDeleteAlertStyle>
			{ error?.data?.status === 500 && (
				<span className=" helpgent-notice helpgent-notice-danger">
					{ __( 'Internal server error', 'helpgent' ) }
				</span>
			) }

			<div className="helpgent-alert-content">
				<div>
					{ __( 'You are about to delete', 'helpgent' ) }{ ' ' }
					{ Array.isArray( formTitle ) ? (
						<ul className="helpgent-form-delete-list">
							{ formTitle.map( ( title, index ) => (
								<li key={ index }>{ title }</li>
							) ) }
						</ul>
					) : (
						<strong>{ formTitle }</strong>
					) }
				</div>

				<p>
					{ Array.isArray( formTitle ) && formTitle.length > 1
						? __(
								'All responses these forms has collected, including associated messages, will be deleted forever.',
								'helpgent'
						  )
						: __(
								'All responses this form has collected, including associated messages, will be deleted forever.',
								'helpgent'
						  ) }
				</p>
				<h4>
					{ __(
						'Are you sure you want to proceed with the deletion?',
						'helpgent'
					) }
				</h4>
			</div>
		</FormDeleteAlertStyle>
	);
}
