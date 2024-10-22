import { useSelect } from '@wordpress/data';
import { Suspense, useState } from '@wordpress/element';
import { applyFilters } from '@wordpress/hooks';
import IntegrationsChild1 from '@formgent/admin/pages/Settings/IntegrationsChild1';
import IntegrationsChild2 from '@formgent/admin/pages/Settings/IntegrationsChild2';
import IntegrationsChild3 from '@formgent/admin/pages/Settings/IntegrationsChild3';
import General from './components/General';
import EmailNotifications from './components/emailNotification/EmailNotifications';
import Edit from './components/emailNotification/Edit';
import Sidebar from './components/Sidebar';
import ReactSVG from 'react-inlinesvg';
import cogIcon from '@icon/cog.svg';
import mailIcon from '@icon/envelope.svg';

function Settings( props ) {
	const [ uiState, setUiState ] = useState( {
		isInserterActive: false,
	} );
	const { CommonReducer } = useSelect( ( select ) => {
		return select( 'formgent' ).getCommonState();
	}, [] );

	const { useParams, Route, Routes, NavLink, useNavigate, useLocation } =
		CommonReducer.routerComponents;

	const settingsRoutes = applyFilters( 'formgent_settings_routes', [
		{
			key: 'general',
			label: 'General Settings',
			icon: <ReactSVG src={ cogIcon } />,
			path: '/*',
			element: <General />,
		},
		{
			key: 'email-notifications',
			label: 'Email Notifications',
			icon: <ReactSVG src={ mailIcon } />,
			path: '/email-notifications',
			element: <EmailNotifications />,
		},
	] );

	return (
		<div className="formgent-editor-wrap">
			<div
				className="formgent-editor-wrap__content"
				style={ { display: 'flex' } }
			>
				<Sidebar
					NavLink={ NavLink }
					useNavigate={ useNavigate }
					useLocation={ useLocation }
					navItems={ settingsRoutes }
				/>

				<Suspense fallback={ <></> }>
					<Routes>
						{ /* { settingsRoutes.map( ( routeItem, index ) => {
							return (
								<Route
									key={ index }
									path={ routeItem.path }
									element={ routeItem.element }
								/>
							);
						} ) } */ }
						<Route key="general" path="*" element={ <General /> } />
						<Route
							key="email-notifications"
							path="email-notifications"
							element={ <EmailNotifications /> }
						/>
						<Route
							key="email-notifications/create"
							path="email-notifications/create"
							element={ <Edit /> }
						/>
						<Route
							key="email-notifications/edit/:email_notification_id"
							path="email-notifications/edit/:email_notification_id"
							element={ <Edit /> }
						/>
						<Route
							key="integrations/child1"
							path="integrations/child1"
							element={ <IntegrationsChild1 /> }
						/>
						<Route
							key="integrations/child2"
							path="integrations/child2"
							element={ <IntegrationsChild2 /> }
						/>
						<Route
							key="integrations/child3"
							path="integrations/child3"
							element={ <IntegrationsChild3 /> }
						/>
					</Routes>
				</Suspense>
			</div>
		</div>
	);
}

export default function SettingsModule( props ) {
	return <Settings { ...props } />;
}
