import { dispatch, useDispatch } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import { Modal } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { registerPlugin } from '@wordpress/plugins';
import { PluginDocumentSettingPanel } from '@wordpress/editor';
import { applyFilters } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';
import domReady from '@wordpress/dom-ready';
import ReactSVG from 'react-inlinesvg';
import ellipsisH from '@icon/ellipsis-h.svg';
import '@formgent/data/store.js';

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

import Settings from '@formgent/admin/pages/Settings/index.js';

/**
 * Initially open editor left and right both sidebar
 */
domReady( function () {
	setTimeout( function () {
		dispatch( 'core/editor' ).setIsInserterOpened( true );
		dispatch( 'core/edit-post' ).openGeneralSidebar( 'edit-post/document' );
	}, 0 );
} );

const FormgentFormSettings = () => {
	const [ isOpen, setOpen ] = useState( false );
	const openSettingsModal = () => {
		const urlWithoutHash = window.location.href.split( '#' )[ 0 ];
		window.history.replaceState( null, null, urlWithoutHash );

		setOpen( true );
	};
	const closeSettingsModal = () => {
		setOpen( false );

		const urlWithoutHash = window.location.href.split( '#' )[ 0 ];
		window.history.replaceState( null, null, urlWithoutHash );
	};

	const { setRouterState } = useDispatch( 'formgent' );

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

	const routes = applyFilters( 'formgent_form_settings_routes', [
		{
			path: '/*',
			element: <Settings />,
		},
	] );

	return (
		<PluginDocumentSettingPanel
			name="custom-panel"
			title=""
			className="formgent-form-settings-panel sds"
		>
			<span
				className="formgent-form-settings-panel__title"
				onClick={ openSettingsModal }
			>
				{ __( 'General Settings', 'formgent' ) }
				<ReactSVG src={ ellipsisH } />
			</span>

			{ isOpen && (
				<Modal
					title={ __( 'Settings', 'formgent' ) }
					className="formgent-form-settings-modal"
					onRequestClose={ closeSettingsModal }
					isFullScreen
				>
					<div className="formgent-form-settings-modal__body">
						<HashRouter>
							<Routes>
								{ routes.map( ( routeItem, index ) => {
									return (
										<Route
											key={ index }
											path={ routeItem.path }
											element={ routeItem.element }
										></Route>
									);
								} ) }
							</Routes>
						</HashRouter>
					</div>
				</Modal>
			) }
		</PluginDocumentSettingPanel>
	);
};

registerPlugin( 'formgent-form-settings', {
	render: FormgentFormSettings,
} );
