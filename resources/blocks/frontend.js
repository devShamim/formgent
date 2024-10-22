/**
 * WordPress dependencies
 */
import { store, getContext, getElement } from '@wordpress/interactivity';
import JustValidate from 'just-validate';
import TomSelect from 'tom-select';
import intlTelInput from 'intl-tel-input';

async function generateFormToken( context ) {
	if ( ! context.formStarted ) {
		try {
			context.generatedTokens = await wp.apiFetch( {
				path: 'formgent/responses/generate-token',
				method: 'POST',
				data: {
					form_id: context.formId,
				},
			} );
		} catch ( error ) {
			console.log( error );
		}
	}
}

// Date and Time Validation
function isValidDate( dateString ) {
	const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
	return (
		regex.test( dateString ) &&
		! isNaN(
			new Date( dateString.split( '/' ).reverse().join( '/' ) ).getTime()
		)
	);
}
function isValidTime( timeString ) {
	const regex = /^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9]|\d)$/;
	return regex.test( timeString );
}
function isValidDateTime( dateTimeString ) {
	const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
	const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9]|\d)$/;
	const [ datePart, timePart ] = dateTimeString.split( ' ' );
	if ( ! dateRegex.test( datePart ) || ! timeRegex.test( timePart ) ) {
		return false;
	}
	const isValidDate = ! isNaN(
		new Date( datePart.split( '/' ).reverse().join( '/' ) ).getTime()
	);
	return isValidDate;
}

// URL validation function
function isUrl( string ) {
	const protocolAndDomainRE = /^(?:\w+:)?\/\/(\S+)$/;
	const localhostDomainRE = /^localhost[\:?\d]*(?:[^\:?\d]\S*)?$/;
	const nonLocalhostDomainRE = /^[^\s\.]+\.\S{2,}$/;
	if ( typeof string !== 'string' ) {
		return false;
	}

	const match = string.match( protocolAndDomainRE );
	if ( ! match ) {
		return false;
	}

	const everythingAfterProtocol = match[ 1 ];
	if ( ! everythingAfterProtocol ) {
		return false;
	}

	if (
		localhostDomainRE.test( everythingAfterProtocol ) ||
		nonLocalhostDomainRE.test( everythingAfterProtocol )
	) {
		return true;
	}

	return false;
}

// Validate website url
function validateWebsiteUrl( element, blocksSettings, isUrl, elementName ) {
	const inputValue = element.ref.value;
	const errorMessageElement = document.createElement( 'div' );
	errorMessageElement.className = 'formgent-url-error';
	errorMessageElement.style.color = 'red';
	const existingError = element.ref
		.closest( '.formgent-editor-block-list__single__wrapper' )
		.querySelector( '.formgent-url-error' );

	if ( ! isUrl( inputValue ) && element.ref.value !== '' ) {
		// Display error message if the URL is invalid
		errorMessageElement.textContent = blocksSettings[ elementName ]
			.validation_message
			? blocksSettings[ elementName ].validation_message
			: 'Please enter a valid URL.';
		if ( ! existingError ) {
			element.ref
				.closest( '.formgent-editor-block-list__single__wrapper' )
				.appendChild( errorMessageElement );
		}
	} else {
		// Remove error message if the URL is valid
		if ( existingError ) {
			existingError.remove();
		}
	}
}

const { callbacks } = store( 'formgent/form', {
	actions: {
		getValue: () => {
			const context = getContext();

			let value = '';
			if ( context.blocksSettings ) {
				for ( const [ blockKey, block ] of Object.entries(
					context.blocksSettings
				) ) {
					if ( block.children ) {
						for ( const [ childKey, child ] of Object.entries(
							block.children
						) ) {
							if ( childKey === context.name ) {
								value = child.value;
								break; // Stop the loop once the condition is met
							} else {
								value = '';
								break;
							}
						}
					} else if ( block.name === context.name ) {
						value = block.value;
						break;
					}
				}
			}
			return value;
		},
		updateInput: async ( e ) => {
			const element = getElement();
			const context = getContext();

			const { blocksSettings } = JSON.parse( JSON.stringify( context ) );
			const elementName = element.ref.name;
			let fieldName = null;

			if ( blocksSettings[ elementName ] ) {
				fieldName = elementName;
			} else {
				for ( const [ key, value ] of Object.entries(
					blocksSettings
				) ) {
					if ( value.children && value.children[ elementName ] ) {
						fieldName = key;
						break;
					}
				}
			}

			// Dispatch custom event for handleFieldInteraction
			const interactionEvent = new CustomEvent( 'fieldInteraction', {
				detail: {
					fieldName,
					fieldInteractionState: context.fieldInteractionState,
					context,
					element,
				},
			} );
			document.dispatchEvent( interactionEvent );

			// update global variables
			generateFormToken( context );
			context.formStarted = true;

			// update field value
			const { data } = context;

			function updateFieldRecursively( data, fieldName, fieldValue ) {
				for ( let k in data ) {
					if ( data.hasOwnProperty( k ) ) {
						if ( k === fieldName ) {
							data[ k ] = fieldValue;
							return;
						} else {
							if ( ! data || typeof data !== 'object' ) {
								return;
							}
							updateFieldRecursively(
								data[ k ],
								fieldName,
								fieldValue
							);
						}
					}
				}
			}

			const fieldType = blocksSettings[ elementName ].field_type;

			// Check if the field type is 'website'
			if ( fieldType === 'website' ) {
				validateWebsiteUrl(
					element,
					blocksSettings,
					isUrl,
					elementName
				);
			}

			updateFieldRecursively( data, element.ref.name, element.ref.value );
		},
		updateNumber: async () => {
			const element = getElement();
			const context = getContext();

			const { blocksSettings } = JSON.parse( JSON.stringify( context ) );
			const elementName = element.ref.name;
			let fieldName = null;

			if ( blocksSettings[ elementName ] ) {
				fieldName = elementName;
			} else {
				for ( const [ key, value ] of Object.entries(
					blocksSettings
				) ) {
					if ( value.children && value.children[ elementName ] ) {
						fieldName = key;
						break;
					}
				}
			}
			// Dispatch custom event for handleFieldInteraction
			const interactionEvent = new CustomEvent( 'fieldInteraction', {
				detail: {
					fieldName,
					fieldInteractionState: context.fieldInteractionState,
					context,
					element,
				},
			} );
			document.dispatchEvent( interactionEvent );

			//format number
			const numberFormat = blocksSettings[ context.name ].format;
			let numberValue = Number( element.ref.value );
			if ( numberFormat === 'decimal' ) {
				numberValue = numberValue.toFixed( 2 );
				element.ref.addEventListener( 'blur', () => {
					element.ref.value = numberValue;
				} );
			} else if ( numberFormat === 'non_decimal' ) {
				numberValue = numberValue.toFixed( 0 );
				element.ref.addEventListener( 'blur', () => {
					element.ref.value = numberValue;
				} );
			}

			//update field data
			context.data[ element.ref.name ] =
				numberFormat === 'non_decimal'
					? Number( numberValue )
					: numberValue;
			generateFormToken( context );
			context.formStarted = true;
		},
		updateGdpr: async () => {
			const element = getElement();
			const context = getContext();

			const { blocksSettings } = JSON.parse( JSON.stringify( context ) );
			const elementName = element.ref.name;
			let fieldName = null;

			if ( blocksSettings[ elementName ] ) {
				fieldName = elementName;
			} else {
				for ( const [ key, value ] of Object.entries(
					blocksSettings
				) ) {
					if ( value.children && value.children[ elementName ] ) {
						fieldName = key;
						break;
					}
				}
			}
			// Dispatch custom event for handleFieldInteraction
			const interactionEvent = new CustomEvent( 'fieldInteraction', {
				detail: {
					fieldName,
					fieldInteractionState: context.fieldInteractionState,
					context,
					element,
				},
			} );
			document.dispatchEvent( interactionEvent );

			//update field data
			context.data[ element.ref.name ] =
				context.data[ element.ref.name ] === '' ||
				context.data[ element.ref.name ] === 0
					? 1
					: 0;
			generateFormToken( context );
			context.formStarted = true;
		},
		updateMultiChoice: () => {
			const element = getElement();
			const context = getContext();
			const elementName = element.ref.name;
			const value = element.ref.value;

			// Set choice limit unlimited if it's empty or 0
			let isChoiceLimitEnabled =
				context.blocksSettings[ elementName ]?.choice_limit;
			let choiceLimit =
				context.blocksSettings[ elementName ]?.choice_limit_item;
			if (
				choiceLimit === '' ||
				choiceLimit === 0 ||
				! isChoiceLimitEnabled
			) {
				choiceLimit = Infinity;
			}

			const choices = context.data[ elementName ] || [];
			const valueIndex = choices.indexOf( value );

			if ( valueIndex > -1 ) {
				//If the item is found remove it
				choices.splice( valueIndex, 1 );
			} else if ( choices.length < choiceLimit ) {
				choices.push( value );
			} else {
				return;
			}

			// Update the choices in the context data
			context.data[ elementName ] = choices;

			let fieldName = elementName;
			const { blocksSettings } = context;

			if ( ! blocksSettings[ elementName ] ) {
				for ( const [ key, value ] of Object.entries(
					blocksSettings
				) ) {
					if ( value.children?.[ elementName ] ) {
						fieldName = key;
						break;
					}
				}
			}

			// Disable or enable select options based on the limit reached
			const allOptions = document.querySelectorAll(
				`[name="${ elementName }"]`
			);
			allOptions.forEach( ( option ) => {
				if (
					choices.length >= choiceLimit &&
					! choices.includes( option.value )
				) {
					option.disabled = true;
				} else {
					option.disabled = false;
				}
			} );

			// Dispatch custom event for handleFieldInteraction
			const interactionEvent = new CustomEvent( 'fieldInteraction', {
				detail: {
					fieldName,
					fieldInteractionState: context.fieldInteractionState,
					context,
					element,
				},
			} );
			document.dispatchEvent( interactionEvent );

			generateFormToken( context );
			context.formStarted = true;
		},
	},

	callbacks: {
		init: async () => {
			const context = getContext();
			const element = getElement();

			// Check if the form has been started
			context.formStarted = false;
			context.fieldInteractionState = {};
			context.generatedTokens = null;

			try {
				const updateFromViews = await wp.apiFetch( {
					path: `formgent/analytics/forms/${ context.formId }/update-view-count`,
					method: 'POST',
					data: {
						form_id: context.formId,
						type: '+',
					},
				} );
			} catch ( error ) {
				console.log( error );
			}

			const { blocksSettings, data } = JSON.parse(
				JSON.stringify( context )
			);
			// Loop through blocksSettings and construct data object
			blocksSettings &&
				Object.entries( blocksSettings ).forEach(
					( [ blockKey, block ] ) => {
						data[ blockKey ] = block.children
							? Object.keys( block.children ).reduce(
									( acc, childKey ) => {
										acc[ childKey ] =
											block.children[ childKey ].value;
										return acc;
									},
									{}
							  )
							: '';
					}
				);
			context.data = { ...data };
			const validation = new JustValidate(
				`#${ element.attributes.id }`,
				{ validateBeforeSubmitting: true }
			);

			let rulesList = {
				email: function ( rules ) {
					rules.push( {
						rule: 'email',
						errorMessage: 'Email is invalid!',
					} );
				},
			};
			const groupField = [ 'single-choice', 'multiple-choice' ];

			function getSelector( fieldType, name, child = false ) {
				switch ( fieldType ) {
					case 'dropdown':
						return element.ref.querySelector(
							`select[name="${ name }"]`
						);
					case 'textarea':
						return element.ref.querySelector(
							`textarea[name="${ name }"]`
						);
					default:
						if ( groupField.includes( fieldType ) ) {
							return element.ref.querySelector(
								`.formgent-${ fieldType }-${ name }`
							);
						} else {
							return element.ref.querySelector(
								`input[name="${ name }"]`
							);
						}
				}
			}

			function applyValidationRules( field, name, rules ) {
				if ( field.required || field.field_type === 'gdpr' ) {
					if ( field.field_type === 'gdpr' ) {
						field.label = 'GDPR';
					}
					rules.push( {
						rule: 'required',
						errorMessage: `${ field.label || 'Field' } is required`,
					} );
				}

				if ( rulesList[ field.field_type ] ) {
					rulesList[ field.field_type ]( rules );
				}
			}

			function addConfirmFieldValidation( field, name, validation ) {
				const confirm_field_element = getSelector(
					field.field_type,
					`${ name }_confirm`
				);

				validation.addField( confirm_field_element, [
					{
						rule: 'required',
						errorMessage: `${
							field.confirm_label || 'Field'
						} is required`,
					},
					{
						validator: ( value ) => {
							const siblingValue = confirm_field_element
								.closest(
									'.formgent-editor-block-list__single'
								)
								.previousElementSibling.previousElementSibling.querySelector(
									'input'
								).value;
							return value === siblingValue;
						},
						errorMessage: `${
							field.confirm_label || 'Field'
						} should be the same`,
					},
				] );
			}

			for ( const name in context.data ) {
				const rules = [];
				const field = context.blocksSettings[ name ];
				if ( typeof context.data[ name ] === 'object' ) {
					for ( const childName in context.data[ name ] ) {
						const childField = field.children[ childName ];
						const selector = getSelector(
							childField.field_type,
							childName,
							true
						);

						applyValidationRules( childField, childName, rules );
						if ( rules.length > 0 ) {
							validation.addField( selector, rules );
						}
					}
				} else {
					const selector = getSelector( field.field_type, name );
					applyValidationRules( field, name, rules );

					if ( rules.length > 0 ) {
						if ( groupField.includes( field.field_type ) ) {
							validation.addRequiredGroup( selector );
						} else {
							validation.addField( selector, rules );
						}
					}

					if ( field.enable_confirmation_field ) {
						addConfirmFieldValidation( field, name, validation );
					}
				}
			}

			validation.onSuccess( ( event ) => {
				event.preventDefault();
				callbacks.submit( context, element );
			} );
		},
		dropdownInit: () => {
			const element = getElement();
			const context = getContext();

			function updateFieldRecursively( data, fieldName, fieldValue ) {
				for ( let k in data ) {
					if ( data.hasOwnProperty( k ) ) {
						if ( k === fieldName ) {
							data[ k ] = fieldValue;
							return;
						} else {
							if ( ! data || typeof data !== 'object' ) {
								return;
							}
							updateFieldRecursively(
								data[ k ],
								fieldName,
								fieldValue
							);
						}
					}
				}
			}

			new TomSelect( `#${ element.ref.id }`, {
				placeholder: 'Select an option...',
				onChange: function ( value ) {
					updateFieldRecursively(
						context.data,
						element.ref.name,
						value
					);

					const { blocksSettings } = JSON.parse(
						JSON.stringify( context )
					);
					const elementName = element.ref.name;
					let fieldName = null;

					if ( blocksSettings[ elementName ] ) {
						fieldName = elementName;
					} else {
						for ( const [ key, value ] of Object.entries(
							blocksSettings
						) ) {
							if (
								value.children &&
								value.children[ elementName ]
							) {
								fieldName = key;
								break;
							}
						}
					}
					// Dispatch custom event for handleFieldInteraction
					const interactionEvent = new CustomEvent(
						'fieldInteraction',
						{
							detail: {
								fieldName,
								fieldInteractionState:
									context.fieldInteractionState,
								context,
								element,
							},
						}
					);
					document.dispatchEvent( interactionEvent );

					generateFormToken( context );
					context.formStarted = true;
				},
			} );
		},
		phoneNumberInit: () => {
			const context = getContext();
			const element = getElement();
			const name = element.ref.name;

			const input = document.querySelector(
				`#${ element.attributes.name }`
			);

			const iti = intlTelInput( input, {
				initialCountry: 'us',
				separateDialCode: context.blocksSettings[ name ].country_code,
			} );

			input.addEventListener( 'countrychange', function ( e ) {
				const selectedCountryData = iti.getSelectedCountryData();
				const dialCode = selectedCountryData.dialCode;
				const name = element.ref.name;

				context.data[ name ] = `+${ dialCode }${ e.target.value }`;
				generateFormToken( context );
				context.formStarted = true;
			} );

			input.addEventListener( 'input', function ( e ) {
				const selectedCountryData = iti.getSelectedCountryData();
				const dialCode = selectedCountryData.dialCode;

				context.data[ name ] = `+${ dialCode }${ e.target.value }`;
				generateFormToken( context );
				context.formStarted = true;
			} );
		},
		inputMaskInit: function () {
			const element = getElement();
			const context = getContext();
			const elementName = element.ref.name;
			const maskType = context.blocksSettings[ elementName ].mask_type;

			// Function to update field value recursively
			function updateFieldRecursively( data, fieldName, fieldValue ) {
				for ( let k in data ) {
					if ( data.hasOwnProperty( k ) ) {
						if ( k === fieldName ) {
							data[ k ] = fieldValue;
							return;
						} else {
							if ( ! data || typeof data !== 'object' ) {
								return;
							}
							updateFieldRecursively(
								data[ k ],
								fieldName,
								fieldValue
							);
						}
					}
				}
			}

			// jQuery Mask options param
			const options = {
				// Mask input
				onChange: function ( cep ) {
					handleMaskedChange( cep );
				},
				// Handle invalid characters except digits
				onInvalid: function ( val, e, f, invalid, options ) {
					const error = invalid[ 0 ];
					console.warn(
						`Invalid character "${ error.v }" at position ${ error.p }. Only digits are allowed.`
					);
				},
			};

			// Function to handle changes for masked inputs
			function handleMaskedChange( cep ) {
				const { blocksSettings } = JSON.parse(
					JSON.stringify( context )
				);
				let fieldName = null;

				if ( blocksSettings[ elementName ] ) {
					fieldName = elementName;
				} else {
					for ( const [ key, value ] of Object.entries(
						blocksSettings
					) ) {
						if ( value.children && value.children[ elementName ] ) {
							fieldName = key;
							break;
						}
					}
				}

				// Update field value
				updateFieldRecursively( context.data, fieldName, cep );
				dispatchInteractionEvent( fieldName );
				validateAndUpdateError( cep );
			}

			// Function to dispatch interaction event
			function dispatchInteractionEvent( fieldName ) {
				const interactionEvent = new CustomEvent( 'fieldInteraction', {
					detail: {
						fieldName,
						context,
						element,
					},
				} );
				document.dispatchEvent( interactionEvent );
				generateFormToken( context );
				formStarted = true;
			}

			// Function to validate and update error messages
			function validateAndUpdateError( cep ) {
				// Validation message
				const errorMessageElement = document.createElement( 'div' );
				errorMessageElement.className = 'formgent-field-error';
				errorMessageElement.style.color = 'red';
				const wrapper = element.ref.closest(
					'.formgent-editor-block-list__single__wrapper'
				);
				const existingError = wrapper.querySelector(
					'.formgent-field-error'
				);

				// Validation configurations date and time
				const validationConfig = {
					'00/00/0000': {
						validate: isValidDate,
						errorMessage: 'Invalid format! Use DD/MM/YYYY.',
					},
					'00:00:00': {
						validate: isValidTime,
						errorMessage: 'Invalid format! Use HH:MM:SS.',
					},
					'00/00/0000 00:00:00': {
						validate: isValidDateTime,
						errorMessage:
							'Invalid format! Use DD/MM/YYYY HH:MM:SS.',
					},
				};

				// Validate and show error if needed
				const config = validationConfig[ maskType ];
				if ( config && ! config.validate( cep ) ) {
					existingError && existingError.remove();
					errorMessageElement.textContent = config.errorMessage;
					wrapper.appendChild( errorMessageElement );
				} else if ( existingError ) {
					existingError.remove();
				}
			}

			// Attach the input event listener directly for non-masked inputs
			if ( maskType === 'none' || maskType === '' ) {
				element.ref.addEventListener( 'input', function () {
					const { blocksSettings } = JSON.parse(
						JSON.stringify( context )
					);
					let fieldName = null;

					if ( blocksSettings[ elementName ] ) {
						fieldName = elementName;
					} else {
						for ( const [ key, value ] of Object.entries(
							blocksSettings
						) ) {
							if (
								value.children &&
								value.children[ elementName ]
							) {
								fieldName = key;
								break;
							}
						}
					}

					// Update field value
					const cleanValue = element.ref.value;
					dispatchInteractionEvent( fieldName );
					updateFieldRecursively(
						context.data,
						element.ref.name,
						cleanValue
					);
				} );
			} else {
				// Attach the mask method for masked inputs
				jQuery( element.ref ).mask( maskType, options );
			}
		},
		submit: async ( context, element ) => {
			const form = element.ref.closest( 'form' );
			const formData = JSON.parse( JSON.stringify( context.data ) );

			if (
				context.isResponseTokenGenerating ||
				context.isResponseSubmitting
			) {
				return;
			}

			// Honeypot security check
			const honeypotField = form.querySelector(
				`input[name="formgent-honeypot-${ context.formId }"]`
			);
			if ( honeypotField.value !== '' ) {
				return;
			}

			// Validate date and time in the form data before submission
			for ( const name in context.data ) {
				if ( context.data.hasOwnProperty( name ) ) {
					const field = context.blocksSettings[ name ];
					const value = context.data[ name ];

					if (
						field.field_type === 'input-masking' &&
						field.mask_type === '00/00/0000' &&
						! isValidDate( value )
					) {
						element.ref
							.querySelector( `input[name="${ field.name }"]` )
							.focus();
						return;
					} else if (
						field.field_type === 'input-masking' &&
						field.mask_type === '00:00:00' &&
						! isValidTime( value )
					) {
						element.ref
							.querySelector( `input[name="${ field.name }"]` )
							.focus();
						return;
					} else if (
						field.field_type === 'input-masking' &&
						field.mask_type === '00/00/0000 00:00:00' &&
						! isValidDateTime( value )
					) {
						element.ref
							.querySelector( `input[name="${ field.name }"]` )
							.focus();
						return;
					}
				}
			}

			for ( const name in context.data ) {
				if ( ! Object.hasOwnProperty.call( context.data, name ) ) {
					continue;
				}
			}
			try {
				const { blocksSettings } = JSON.parse(
					JSON.stringify( context )
				);
				const elementName = element.ref.name;
				let fieldName = null;

				if ( blocksSettings[ elementName ] ) {
					fieldName = elementName;
				} else {
					for ( const [ key, value ] of Object.entries(
						blocksSettings
					) ) {
						if ( value.children && value.children[ elementName ] ) {
							fieldName = key;
							break;
						}
					}
				}
				// Dispatch custom event for handleResetInteraction
				const resetInteractionEvent = new CustomEvent(
					'resetFieldInteraction',
					{
						detail: {
							fieldName,
							fieldInteractionState:
								context.fieldInteractionState,
							context,
						},
					}
				);
				document.dispatchEvent( resetInteractionEvent );

				context.isResponseTokenGenerating = true;

				// Generate form token
				let responseToken = null;
				if ( ! context.formStarted ) {
					responseToken = await wp.apiFetch( {
						path: 'formgent/responses/generate-token',
						method: 'POST',
						data: {
							form_id: context.formId,
						},
					} );
				}

				context.isResponseTokenGenerating = false;
				context.isResponseSubmitting = true;

				// Submit form response
				const response = await wp.apiFetch( {
					path: '/formgent/responses',
					method: 'POST',
					data: {
						id: context.formId,
						form_data: formData,
						response_token:
							responseToken ||
							context.generatedTokens.response_token,
					},
				} );

				context.isResponseSubmitting = false;

				form.querySelector(
					'.formgent-notices'
				).innerHTML = `<span>${ response.message }</span>`;

				context.formStarted = false;
				context.fieldInteractionState = {};
				context.generatedTokens = null;

				for ( const name in context.data ) {
					const allOptions = document.querySelectorAll(
						`[name="${ name }"]`
					);
					allOptions.forEach( ( option ) => {
						option.disabled = false;
					} );
				}

				form.reset();
			} catch ( error ) {
				context.isResponseSubmitting = false;
				console.error( 'Error:', error );
			}
		},
	},
} );
