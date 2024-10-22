import { useDispatch } from '@wordpress/data';
import { Suspense, useEffect, useState } from '@wordpress/element';
import {
	HashRouter,
	Link,
	NavLink,
	Navigate,
	Route,
	Routes,
	useLocation,
	useNavigate,
	useParams,
} from 'react-router-dom';

import { applyFilters } from '@wordpress/hooks';
import { SlotFillProvider } from '@wordpress/components';
import { getPlugins } from '@wordpress/plugins';
import AddForm from './pages/AddForm/index.js';
import FormTable from './pages/FormTable/index.js';
import ResponseTable from './pages/ResponseTable/index.js';
import Analytics from './pages/Analytics/index.js';
import Settings from './pages/Settings/index.js';
import Summary from './pages/Summary/index.js';

export default function App() {
	const { setRouterState } = useDispatch( 'formgent' );
	const [ dir, setDir ] = useState( 'ltr' );
	const theme = {
		direction: dir,
	};

	const Plugins = () => {
		return getPlugins().map( ( plugin, index ) => {
			const Component = plugin.render;
			return <Component key={ index } />;
		} );
	};

	useEffect( () => {
		if ( document.documentElement.getAttribute( 'dir' ) === 'rtl' ) {
			setDir( 'rtl' );
		} else {
			setDir( 'ltr' );
		}
	}, [] );

	useEffect( () => {
		if ( ! setRouterState ) {
			return;
		}
		setRouterState( {
			HashRouter,
			Routes,
			Route,
			Link,
			NavLink,
			Navigate,
			useNavigate,
			useParams,
			useLocation,
		} );
	}, [ setRouterState ] );

	// Admin Routes
	const adminRoutes = applyFilters( 'formgent_admin_routes', [
		{
			path: '/*',
			element: <FormTable />,
		},
		{
			path: '/forms/:id/settings/*',
			element: <Settings />,
		},
		{
			path: '/forms/:id/response/*',
			element: <ResponseTable />,
		},
		{
			path: '/forms/:id/summary/*',
			element: <Summary />,
		},
		{
			path: '/forms/:id/analytics/*',
			element: <Analytics />,
		},
		{
			path: '/forms/form-new/:type',
			element: <AddForm />,
		},
	] );

	return (
		<div className="formgent-app-wrap">
			<SlotFillProvider>
				<Plugins />
				<HashRouter>
					<Suspense fallback={ <></> }>
						<Routes>
							{ adminRoutes.map( ( routeItem, index ) => {
								return (
									<Route
										key={ index }
										path={ routeItem.path }
										element={ routeItem.element }
									></Route>
								);
							} ) }
						</Routes>
					</Suspense>
				</HashRouter>
			</SlotFillProvider>
		</div>
	);
}
