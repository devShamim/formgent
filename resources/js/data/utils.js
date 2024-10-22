export const isObject = ( value ) =>
	value && typeof value === 'object' && ! Array.isArray( value );

/**
 * @param {object} error
 * @param {string} defaultMessage
 * @returns string
 */
export function getErrorMessage( error, defaultMessage = '' ) {
	if ( ! isObject( error ) ) {
		return defaultMessage;
	}

	if ( error.message ) {
		return error.message;
	}

	if ( isObject( error.messages ) ) {
		const errorKeys = Object.keys( error.messages );

		if ( ! errorKeys.length ) {
			return defaultMessage;
		}

		const errorMessages = error.messages[ errorKeys[ 0 ] ];

		if ( ! errorMessages.length ) {
			return defaultMessage;
		}

		return errorMessages[ 0 ];
	}

	return defaultMessage;
}
