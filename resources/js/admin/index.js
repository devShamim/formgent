import '../data/store.js';
import { createRoot } from '@wordpress/element';

import App from './app';
document.addEventListener( 'DOMContentLoaded', function () {
	const container = document.querySelector( '.formgent-root' );
	if ( ! container ) {
		return;
	}
	if ( createRoot ) {
		const root = createRoot( container );

		root.render( <App /> );
	} else {
		render( <App />, container );
	}
} );
