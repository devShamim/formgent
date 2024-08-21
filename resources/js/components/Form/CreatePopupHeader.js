import PropTypes from 'prop-types';
import { __, sprintf } from '@wordpress/i18n';

export default function CreatePopupHeader( props ) {
	const { title, step } = props;

	return (
		<div className="formgent-createPopup__header">
			<span className="formgent-createPopup__header-step">
				{ sprintf( __( 'Step %s of 2', 'formgent' ), step ) }
			</span>
			{ title && <h4>{ title }</h4> }
			{ step === '1' ? (
				<p>
					{ __(
						'Select the type of form you want to create',
						'formgent'
					) }
				</p>
			) : (
				<p>
					{ __(
						'Start from scratch or you can select a template to assist you.',
						'formgent'
					) }
				</p>
			) }
		</div>
	);
}

CreatePopupHeader.propTypes = {
	title: PropTypes.string,
	subtitle: PropTypes.string,
};
