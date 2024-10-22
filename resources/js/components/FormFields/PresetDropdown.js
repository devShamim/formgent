import { Dropdown, Tooltip } from 'antd';
import ReactSVG from 'react-inlinesvg';
import questionSolidIcon from '@icon/question-solid.svg';

export default function PresetDropdown( props ) {
	const {
		value,
		items,
		onInsert,
		onChange,
		trigger,
		children,
		dropdownClassName,
	} = props;

	const PresetDropdownItem = ( { label, description } ) => {
		return (
			<div className="formgent-space formgent-space-middle-start">
				{ description && (
					<Tooltip
						placement="top"
						title={ description }
						arrow={ true }
					>
						<span className="formgent-tooltip-icon">
							<ReactSVG src={ questionSolidIcon } />
						</span>
					</Tooltip>
				) }
				<span>{ label }</span>
			</div>
		);
	};

	function parsePresetFields( presetFields ) {
		return presetFields.map( ( item ) => ( {
			...item,
			label: <PresetDropdownItem { ...item } />,
		} ) );
	}

	return (
		<Dropdown
			menu={ {
				items: parsePresetFields( items ),
				onClick: ( dropdownValue ) => {
					if ( typeof onChange === 'function' ) {
						onChange(
							`${ value ? value : '' }${ dropdownValue.key }`
						);
					}

					if ( typeof onInsert === 'function' ) {
						onInsert( dropdownValue.key );
					}
				},
			} }
			trigger={ trigger ? trigger : [ 'click' ] }
			overlayClassName={ dropdownClassName }
		>
			{ children }
		</Dropdown>
	);
}
