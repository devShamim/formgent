import { utils, write } from 'xlsx';

const PrepareExportData = ( data ) => {
	const { form, responses } = data;

	const fieldNames = [];
	const fieldColumns = [];

	/**
	 * generating response answer column name
	 */
	for ( const key in form ) {
		// const field = form[ key ];
		fieldNames.push( key );
		fieldColumns.push( key );
	}

	let headers = Object.keys( responses[ 0 ] ).filter(
		( item ) => item !== 'answers'
	);

	const exportData = [];

	for ( var k in responses ) {
		const response = responses[ k ];
		const item = [];

		/**
		 * Add response item in export data
		 */
		headers.forEach( ( column ) => {
			item.push( response[ column ] );
		} );

		/**
		 * Adding answer value in export data
		 */
		fieldNames.forEach( ( fieldName ) => {
			let setValue = false;
			response.answers.forEach( ( answer ) => {
				if ( answer.field_name === fieldName ) {
					item.push( answer.value );
					setValue = true;
				}
			} );

			if ( ! setValue ) {
				item.push( null );
			}
		} );

		exportData.push( item );
	}

	/**
	 * Adding export data header
	 */
	exportData.unshift( [ ...headers, ...fieldColumns ] );

	return exportData;
};

const exportToSpreadsheet = ( data, fileName ) => {
	const workbook = utils.book_new();

	// Convert JSON data to a worksheet
	const worksheet = utils.aoa_to_sheet( PrepareExportData( data ) );

	// Append the worksheet to the workbook
	utils.book_append_sheet( workbook, worksheet, 'Sheet1' );

	// Generating downloadable link
	const buffer = write( workbook, { bookType: 'xlsx', type: 'array' } );
	const blob = new Blob( [ buffer ], { type: 'application/octet-stream' } );

	const link = document.createElement( 'a' );
	link.download = `${ fileName }.xlsx`;
	link.href = URL.createObjectURL( blob );
	document.body.appendChild( link );

	// Trigger the download by simulating a click
	link.click();

	// Remove the link from the document
	document.body.removeChild( link );
};

export { exportToSpreadsheet, PrepareExportData };
