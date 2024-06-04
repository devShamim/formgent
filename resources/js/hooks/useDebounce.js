import { useEffect, useState } from '@wordpress/element';

export function useDebounce( value, delay ) {
	// State and setters for debounced value
	const [ debouncedValue, setDebouncedValue ] = useState( value );

	useEffect( () => {
		const timeoutHandler = setTimeout( () => {
			setDebouncedValue( value );
		}, delay );

		return () => clearTimeout( timeoutHandler );
	}, [ value, delay ] );

	return debouncedValue;
}
