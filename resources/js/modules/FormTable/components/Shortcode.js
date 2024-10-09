import { useState } from '@wordpress/element';
import { useCopyToClipboard } from '@wordpress/compose';
import { Tooltip } from '@wordpress/components';
import ReactSVG from 'react-inlinesvg';
import checkIcon from '@icon/check.svg';
import copyIcon from '@icon/copy.svg';
import spinnerIcon from '@icon/spinner.svg';
import { __ } from '@wordpress/i18n';
import clsx from 'clsx';

export default function Shortcode( { record } ) {
	const [ isCopied, setIsCopied ] = useState( false );
	const [ isCopying, setIsCopying ] = useState( false );
	const [ copiedShortcode, setCopiedShortcode ] = useState( null );
	const [ inputPosition, setInputPosition ] = useState( null );
	const [ copyingTimeoutId, setCopyingTimeoutId ] = useState( null );
	const [ copiedTimeoutId, setCopiedTimeoutId ] = useState( null );

	const copyRef = useCopyToClipboard(
		`[formgent id="${ record?.id }"]`,
		() => {
			setIsCopied( true );
			if ( copiedTimeoutId ) {
				clearTimeout( copiedTimeoutId );
			}
			const copiedTimeout = setTimeout( () => {
				setIsCopied( false );
			}, 3000 );
			setCopiedTimeoutId( copiedTimeout );
		}
	);

	const handleShortcodeCopy = () => {
		setCopiedShortcode( record?.id );

		if ( copyingTimeoutId ) {
			clearTimeout( copyingTimeoutId );
		}

		setIsCopying( true );
		const copyingTimeout = setTimeout( () => {
			setIsCopying( false );
		}, 500 );
		setCopyingTimeoutId( copyingTimeout );
	};

	document.addEventListener( 'scroll', () => {
		const inputRects = document.querySelector(
			`input[data-shortcode_id="${ copiedShortcode }"]`
		);
		setInputPosition( inputRects && inputRects.getBoundingClientRect() );
	} );

	return (
		<Tooltip
			text={
				isCopied && copiedShortcode === record?.id
					? ''
					: __( 'Click to copy', 'formgent' )
			}
			delay="0"
			placement="bottom"
			hideOnClick={ true }
		>
			<label
				className={ clsx( {
					'formgent-form-shortcode__copying':
						isCopying && copiedShortcode === record?.id,
					'formgent-form-shortcode__copied':
						! isCopying &&
						isCopied &&
						copiedShortcode === record?.id,
				} ) }
			>
				{ isCopying && copiedShortcode === record?.id ? (
					<ReactSVG src={ spinnerIcon } />
				) : ! isCopying &&
				  isCopied &&
				  copiedShortcode === record?.id ? (
					<ReactSVG src={ checkIcon } />
				) : (
					<ReactSVG src={ copyIcon } />
				) }
				<input
					type="text"
					readOnly
					value={
						isCopying & ( copiedShortcode === record?.id )
							? ''
							: ! isCopying &&
							  isCopied &&
							  copiedShortcode === record?.id
							? __( 'Copied!', 'formgent' )
							: `[formgent id="${ record?.id }"]`
					}
					data-shortcode_id={ record?.id }
					ref={ copyRef }
					onClick={ handleShortcodeCopy }
				/>
			</label>
		</Tooltip>
	);
}
