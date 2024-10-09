import { __ } from '@wordpress/i18n';
import { FormDeleteAlertStyle } from './style';

export default function FormDeleteAlert( props ) {
	const { error, formTitle, type } = props;
	return (
		<FormDeleteAlertStyle>
			{ error?.data?.status === 500 && (
				<span className=" helpgent-notice helpgent-notice-danger">
					{ __( 'Internal server error', 'formgent' ) }
				</span>
			) }

			<div className="helpgent-alert-content">
				<div>
					{ __( 'You are about to delete', 'formgent' ) }{ ' ' }
					{ Array.isArray( formTitle ) ? (
						formTitle.length === 1 ? (
							<strong>"{ formTitle[ 0 ] }"</strong>
						) : (
							<ul className="helpgent-form-delete-list">
								{ formTitle.map( ( title, index ) => (
									<li key={ index }>{ title }</li>
								) ) }
							</ul>
						)
					) : (
						<strong>"{ formTitle }"</strong>
					) }
				</div>

				{ type !== 'note' && (
					<p>
						{ Array.isArray( formTitle ) && formTitle.length > 1
							? __(
									'All responses has collected, including all submission data will be deleted forever.',
									'formgent'
							  )
							: __(
									'This response has collected, including all submission data will be deleted forever.',
									'formgent'
							  ) }
					</p>
				) }

				<h4>
					{ __(
						'Are you sure you want to proceed with the deletion?',
						'formgent'
					) }
				</h4>
			</div>
		</FormDeleteAlertStyle>
	);
}
