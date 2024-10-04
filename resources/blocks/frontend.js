/**
 * WordPress dependencies
 */
import { store, getContext, getElement } from '@wordpress/interactivity';
import JustValidate from 'just-validate';
import TomSelect from 'tom-select';
import intlTelInput from 'intl-tel-input';

let formStarted = false;
let fieldInteractionState = {};
let generatedTokens = null;

async function generateFormToken( context ) {
	if ( ! formStarted ) {
		try {
			generatedTokens = await wp.apiFetch( {
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
		updateInput: async () => {
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
					fieldInteractionState,
					context,
					element,
				},
			} );
			document.dispatchEvent( interactionEvent );

			generateFormToken( context );
			formStarted = true;

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
					fieldInteractionState,
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
			formStarted = true;
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
					fieldInteractionState,
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
			formStarted = true;
		},
		updatePhoneNumber: () => {
			const element = getElement();
			const context = getContext();
			const name = element.ref.name;
			if (
				typeof context.data[ name ] !== 'object' ||
				context.data[ name ] === null
			) {
				context.data[ name ] = {
					dialCode: context.blocksSettings[ name ].country_code
						? '+1'
						: '',
					number: '',
				};
			}

			context.data[ name ].number = element.ref.value;

			if ( typeof context.data[ name ] === 'object' ) {
				context.data[
					name
				] = `${ context.data[ name ].dialCode }${ context.data[ name ].number }`;
			}

			generateFormToken( context );
			formStarted = true;
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
					fieldInteractionState,
					context,
					element,
				},
			} );
			document.dispatchEvent( interactionEvent );

			generateFormToken( context );
			formStarted = true;
		},
	},

	callbacks: {
		init: async () => {
			const context = getContext();
			const element = getElement();

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
								fieldInteractionState,
								context,
								element,
							},
						}
					);
					document.dispatchEvent( interactionEvent );

					generateFormToken( context );
					formStarted = true;
				},
			} );
		},
		phoneNumberInit: () => {
			const context = getContext();
			const element = getElement();
			const name = element.ref.getAttribute( 'data-wp-key' );

			if (
				typeof context.data[ name ] !== 'object' ||
				context.data[ name ] === null
			) {
				context.data[ name ] = {
					dialCode: context.blocksSettings[ name ].country_code
						? '+1'
						: '',
					number: '',
				};
			}
			// Initialize intl-tel-input on the phone input field
			const input = document.querySelector(
				`#${ element.attributes.name }`
			);

			const iti = intlTelInput( input, {
				initialCountry: 'us',
				separateDialCode: context.blocksSettings[ name ].country_code,
			} );

			input.addEventListener( 'countrychange', function () {
				const selectedCountryData = iti.getSelectedCountryData();
				const fullNumber = iti.getNumber();
				const dialCode = selectedCountryData.dialCode;
				const name = element.ref.getAttribute( 'data-wp-key' );

				context.data[ name ] = {
					dialCode: `+${ dialCode }`,
					number: fullNumber,
				};
			} );

			//validation
			input.addEventListener( 'blur', function () {
				if ( iti.isValidNumber() ) {
					const fullNumber = iti.getNumber();
					const selectedCountryData = iti.getSelectedCountryData();
					const dialCode = selectedCountryData.dialCode;
					if (
						typeof context.data[ name ] !== 'object' ||
						context.data[ name ] === null
					) {
						context.data[ name ] = {
							dialCode: context.blocksSettings[ name ]
								.country_code
								? '+1'
								: '',
							number: '',
						};
					}
					context.data[ name ].dialCode = `+${ dialCode }`;
					context.data[ name ].number =
						context.data[ name ].number || fullNumber;

					// todo: validation tweak
				} else {
					console.log( 'Invalid phone number' );
				}
			} );
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

			for ( const name in context.data ) {
				if ( context.data.hasOwnProperty( name ) ) {
					if (
						typeof context.data[ name ] === 'object' &&
						context.data[ name ].dialCode &&
						context.data[ name ].number
					) {
						context.data[
							name
						] = `${ context.data[ name ].dialCode }${ context.data[ name ].number }`;
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
							fieldInteractionState,
							context,
						},
					}
				);
				document.dispatchEvent( resetInteractionEvent );

				context.isResponseTokenGenerating = true;

				// Generate form token
				let responseToken = null;
				if ( ! formStarted ) {
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
							responseToken || generatedTokens.response_token,
					},
				} );

				context.isResponseSubmitting = false;

				form.querySelector(
					'.formgent-notices'
				).innerHTML = `<span>${ response.message }</span>`;

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
