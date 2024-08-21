import { __ } from '@wordpress/i18n';
let timeoutId;

export default function handleTextSelect( props ) {
	const { copyableText, setCopiedText } = props;
	try {
		navigator.clipboard
			.writeText( copyableText )
			.then( ( res ) => {
				setCopiedText( __( 'Copied to clipboard!', 'helpgent' ) );

				if ( timeoutId ) {
					clearTimeout( timeoutId );
				}
				timeoutId = setTimeout( () => {
					setCopiedText( '' );
					timeoutId = null;
				}, 2000 );
			} )
			.catch( ( err ) => {
				console.error(
					__( 'Unable to copy text to clipboard', 'helpgent' ),
					err
				);
			} );
	} catch ( err ) {
		console.error( __( 'Clipboard API not supported', 'helpgent' ), err );
	}
}
