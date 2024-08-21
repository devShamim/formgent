import apiFetch from '@wordpress/api-fetch';

jQuery( function () {
	const control = elementor.modules.controls.Select2.extend( {
		onReady: function () {
			this.controlSelect = this.$el.find( '.custom-control-select' );
			this.savedValue = this.$el.find( '.saved-value' ).val();

			apiFetch( { path: '/formgent/admin/forms/select' } )
				.then( ( response ) => {
					const forms = response.forms;

					let options = forms.map( ( form ) => {
						return {
							text: form.label,
							id: form.value,
							selected: this.savedValue === form.value,
						};
					} );

					options.unshift( {
						text: '-- Select a Form --',
						id: '0',
						selected: true,
					} );

					this.controlSelect.select2( {
						data: options,
					} );
				} )
				.catch( ( error ) => {
					console.error( 'Failed to fetch forms:', error );
				} );
		},

		onBeforeDestroy: function () {
			this.controlSelect.select2( 'close' );
		},
	} );

	elementor.addControlView( 'formgent-select', control );
} );
