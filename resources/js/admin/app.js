import { lazy, Suspense, useState, useEffect } from '@wordpress/element';
import { useDispatch } from '@wordpress/data';
import { ConfigProvider } from 'antd';
import {
	HashRouter,
	Routes,
	Route,
	Link,
	NavLink,
	useNavigate,
	useParams,
	useLocation,
} from 'react-router-dom';

import { applyFilters } from '@wordpress/hooks';
// import { ThemeProvider } from 'styled-components';
import Editor from './pages/Editor/index.js';
import FormTable from './pages/FormTable/index.js';

export default function App() {
	// const data = useSelect((select) => {
	//     return select('newform').getForms();
	// }, []);
	// console.log(data.FormReducer, data);
	// const { forms, isLoading, error} = data.FormReducer;
	// console.log(forms, isLoading, error,data.FormReducer);
	// return <h1>Hello Form Builder</h1>
	const { setRouterState } = useDispatch( 'newform' );
	const [ dir, setDir ] = useState( 'ltr' );
	const theme = {
		direction: dir,
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
			useNavigate,
			useParams,
			useLocation,
		} );
	}, [ setRouterState ] );

	const adminRoutes = applyFilters( 'newform_admin_routes', [
		{
			path: '/*',
			element: <FormTable />,
		},
	] );

	return (
		<div className="newform-app-wrap">
			<HashRouter>
				<Suspense fallback={ <></> }>
					{ /* <ThemeProvider theme={ theme }> */ }
					{ /* <ConfigProvider
						theme={ {
							token: {
								// Seed Token
								colorPrimary: '#000000',
								borderRadius: 2,

								// Alias Token
								colorBgContainer: '#f6ffed',
							},
						} }
					> */ }
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
					{ /* </ConfigProvider> */ }
					{ /* </ThemeProvider> */ }
				</Suspense>
			</HashRouter>
		</div>
	);
}
