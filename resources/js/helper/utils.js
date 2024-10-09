function formatDate( formatType, date, options, isTimeActive = true ) {
	const dataObject = new Date( date );
	const formattedDate = dataObject.toLocaleDateString( formatType, options );
	const formattedTime = dataObject.toLocaleTimeString( formatType, {
		hour: '2-digit',
		minute: '2-digit',
	} );

	return (
		<>
			<span className="formgent-form-date__day">{ formattedDate }</span>
			{ isTimeActive && (
				<span className="formgent-form-date__time">
					{ formattedTime }
				</span>
			) }
		</>
	);
}

function convertToTitleCase( text ) {
	return text
		.replace( /_/g, ' ' )
		.split( ' ' )
		.map( ( word ) => word.charAt( 0 ).toUpperCase() + word.slice( 1 ) )
		.join( ' ' );
}

export { formatDate, convertToTitleCase };
