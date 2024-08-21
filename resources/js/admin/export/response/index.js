import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { utils, write } from 'xlsx';

const PrepareExportData = ( data ) => {
	const { form, responses } = data;

	const formFields = form;

	const fieldIds = [];
	const fieldColumns = [];

	/**
	 * generating response answer column name
	 */
	for ( const key in formFields ) {
		const field = formFields[ key ];
		fieldIds.push( field.id );
		fieldColumns.push( `f_${ field.type }_${ field.name }_${ field.id }` );
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
		fieldIds.forEach( ( fieldId ) => {
			let setValue = false;
			response.answers.forEach( ( answer ) => {
				if ( answer.field_id === fieldId ) {
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

const exportToPDF = ( data, fileName ) => {
	const { form, responses } = data;

	const formFields = form;

	const fieldIds = [];
	const fieldColumns = [];

	/**
	 * generating response answer column name
	 */
	for ( const key in formFields ) {
		const field = formFields[ key ];
		fieldIds.push( field.id );
		fieldColumns.push( `f_${ field.type }_${ field.name }_${ field.id }` );
	}

	let headers = Object.keys( responses[ 0 ] ).filter(
		( item ) => item !== 'answers'
	);

	const doc = new jsPDF();
	doc.setFontSize( 14 );

	// Define starting position for the first table
	let startY = 30;

	for ( var k in responses ) {
		const response = responses[ k ];
		const item = [];

		/**
		 * Add response item in export data
		 */
		headers.forEach( ( column ) => {
			item.push( [ column, response[ column ] ] );
		} );

		/**
		 * Adding answer value in export data
		 */
		fieldIds.forEach( ( fieldId, index ) => {
			let setValue = false;
			response.answers.forEach( ( answer ) => {
				if ( answer.field_id === fieldId ) {
					item.push( [ fieldColumns[ index ], answer.value ] );
					setValue = true;
				}
			} );

			if ( ! setValue ) {
				item.push( [ fieldColumns[ index ], null ] );
			}
		} );

		doc.text(
			`Table ${ k }`,
			doc.internal.pageSize.getWidth() / 2,
			startY - 5,
			{ align: 'center' }
		);

		autoTable( doc, {
			body: item,
			startY: startY,
			margin: { left: 14 }, // Align the tables to the left side
			styles: { fillColor: [ 255, 255, 255 ] }, // Background color for all cells
			columnStyles: {
				0: {
					fontStyle: 'bold',
					fillColor: [ 232, 230, 252 ],
					textColor: [ 101, 81, 242 ],
					minCellWidth: 50,
				},
			},
			tableWidth: 'wrap',
		} );
		startY = doc.autoTable.previous.finalY + 30; // Adjust spacing between tables
	}

	// Save the PDF
	doc.save( `${ fileName }.pdf` );
};

export { exportToPDF, exportToSpreadsheet, PrepareExportData };
