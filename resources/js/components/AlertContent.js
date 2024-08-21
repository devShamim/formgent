import { AlertContentStyle } from '@formgent/components/style';
import { sprintf, __ } from '@wordpress/i18n';

export default function AlertContent( props ) {
	return (
		<AlertContentStyle>
			<div className="formgent-alert-content">
				<span className="formgent-text-warning formgent-mb-15">
					{ __( 'Warning:', 'formgent' ) }
				</span>
				<ul>
					<li>
						{ sprintf(
							__(
								'Deleting this %s will result in the permanent loss of response data associated with this %s.',
								'formgent'
							),
							'field'
						) }
					</li>
					<li>
						{ sprintf(
							__(
								'If logic rules are applied to this %s, deleting it will break the logic.',
								'formgent'
							),
							'field'
						) }
					</li>
				</ul>
				<h4>
					{ __( 'Are you sure you want to delete it?', 'formgent' ) }
				</h4>
			</div>
		</AlertContentStyle>
	);
}
