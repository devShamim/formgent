import { ColorPicker, Dropdown, Button } from '@wordpress/components';
import { useViewportMatch } from '@wordpress/compose';

export default function PickColor( {
	attr_key,
	control,
	attributes,
	setAttributes,
} ) {
	function dropdownProps() {
		const isMobile = useViewportMatch( 'medium', '<' );
		return ! isMobile
			? {
					placement: 'left-start',
					offset: 148,
			  }
			: {};
	}
	console.log( attributes[ attr_key ] );

	return (
		<div className="formgent-control-color-picker">
			<span className="formgent-control-label">{ control.label }</span>

			<Dropdown
				className="formgent-control-color-picker-dropdown"
				contentClassName="formgent-control-color-picker-dropdown-content"
				popoverProps={ dropdownProps() }
				renderToggle={ ( { isOpen, onToggle } ) => (
					<Button
						onClick={ onToggle }
						aria-expanded={ isOpen }
						className="formgent-control-color-picker-trigger"
					>
						<span className="formgent-control-color-picker-value">
							{ attributes[ attr_key ] }
						</span>
						<span
							className="formgent-control-color-picker-color"
							style={ { background: attributes[ attr_key ] } }
						></span>
					</Button>
				) }
				renderContent={ () => (
					<div className="formgent-control-color-picker-input">
						<ColorPicker
							color={
								attributes[ attr_key ]
									? attributes[ attr_key ]
									: control.color
							}
							onChange={ function ( value ) {
								setAttributes( { [ attr_key ]: value } );
							} }
						/>
					</div>
				) }
			/>
		</div>
	);
}
