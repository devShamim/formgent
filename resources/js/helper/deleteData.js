import apiFetch from '@wordpress/api-fetch';

/**
 * Helper function to perform a DELETE request using the WordPress REST API.
 *
 * @param {string} path The REST API path to send the request to.
 * @param {Object} config Optional parameters for the request.
 * @returns {Promise} The response from the REST API.
 */
const deleteData = async ( path, config = {} ) => {
	try {
		const response = await apiFetch( {
			path: 'formgent/' + path,
			method: 'DELETE',
			body: JSON.stringify( config ),
		} );
		return response;
	} catch ( error ) {
		console.error( 'Error making DELETE request:', error );
		throw error;
	}
};

export default deleteData;
