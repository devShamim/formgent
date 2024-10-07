import { Col, Row } from 'antd';
import ReactSVG from 'react-inlinesvg';
import { __ } from '@wordpress/i18n';
import { lazy, Suspense } from '@wordpress/element';

import plusIcon from '@icon/plus.svg';
import { AntButton, AntSkeleton } from '@formgent/components';

import { SettingsContentStyle } from '../style';
const Table = lazy( () => import( './Table' ) );

export default function EmailNotifications() {
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
						onClick={ () => {} }
					>
						<ReactSVG src={ plusIcon } />{ ' ' }
						{ __( 'Add Notification', 'formgent' ) }
					</AntButton>
				</Col>
			</Row>

			<Suspense fallback={ <AntSkeleton active /> }>
				<Table />
			</Suspense>
		</SettingsContentStyle>
	);
}
