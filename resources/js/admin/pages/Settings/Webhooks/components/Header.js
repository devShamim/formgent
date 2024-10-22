import { useSelect } from '@wordpress/data';
import { AntButton } from '@formgent/components';
import { __ } from '@wordpress/i18n';
import { HeaderStyle } from '@formgent/modules/FormTable/components/style';
import ReactSVG from 'react-inlinesvg';
import plus from '@icon/plus.svg';

export default function Header() {
	const { CommonReducer } = useSelect( ( select ) => {
		return select( 'formgent' ).getCommonState();
	}, [] );

	const { useNavigate } = CommonReducer.routerComponents;
	const navigate = useNavigate && useNavigate();
	return (
		<HeaderStyle>
			<div className="formgent-header-top">
				<div className="formgent-header-top__content formgent-d-flex">
					<h1 className="formgent-header-top__title">
						{ __( 'Webhooks', 'formgent' ) }
					</h1>
					<AntButton
						type="primary"
						size="middle"
						className="formgent-page-header-btn"
						onClick={ () => navigate( 'create' ) }
					>
						<ReactSVG src={ plus } />
						{ __( 'Add Webhook', 'formgent' ) }
					</AntButton>
				</div>
			</div>
		</HeaderStyle>
	);
}
