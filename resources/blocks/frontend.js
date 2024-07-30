/**
 * WordPress dependencies
 */
import { store, getContext, getElement } from '@wordpress/interactivity';

store( 'formgent-block', {
	actions: {
		toggle: () => {
			const context = getContext();
			context.isOpen = ! context.isOpen;
		},
		updateInput: () => {
			const element = getElement();
			const context = getContext();
			context[ element.ref.name ] = element.ref.value;
		},

		updateNumber: () => {
			const element = getElement();
			const context = getContext();
			context[ element.ref.name ] = parseInt( element.ref.value );
		},
	},
	callbacks: {},
} );
