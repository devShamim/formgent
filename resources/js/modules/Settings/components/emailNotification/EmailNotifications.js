import { Col, Row } from 'antd';
import { Suspense, useEffect } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import { AntButton, AntSkeleton } from '@formgent/components';
import { SettingsContentStyle } from '../style';
import { __ } from '@wordpress/i18n';
import ReactSVG from 'react-inlinesvg';
import plusIcon from '@icon/plus.svg';
import Table from './Table';

export default function EmailNotifications() {
	const { resetEmailNotificationSingle } = useDispatch( 'formgent' );
	const { formID, navigateTo } = useSelect( ( select ) => {
		const { CommonReducer } = select( 'formgent' ).getCommonState();

		const { useNavigate } = CommonReducer.routerComponents;
		const params = new URL( document.location.toString() ).searchParams;

		const navigateTo = useNavigate();

		return {
			navigateTo,
			formID: parseInt( params.get( 'post' ) ),
		};
	}, [] );

	useEffect( () => {
		resetEmailNotificationSingle();
	}, [] );

	return (
		<SettingsContentStyle className="formgent-settings-content">
			<Row align={ 'middle' }>
				<Col flex={ 'auto' }>
					<h4 className="formgent-settings-content__title">
						{ __( 'Email Notifications', 'helpgent' ) }
					</h4>
				</Col>

				<Col>
					<AntButton
						type="primary"
						className="formgent-page-header-btn"
						onClick={ () => {
							navigateTo( `/email-notifications/create`, {
								replace: true,
							} );
						} }
					>
						<ReactSVG src={ plusIcon } />{ ' ' }
						{ __( 'Add Notification', 'formgent' ) }
					</AntButton>
				</Col>
			</Row>

			<Suspense fallback={ <AntSkeleton active /> }>
				<Table formID={ formID } />
			</Suspense>
		</SettingsContentStyle>
	);
}
