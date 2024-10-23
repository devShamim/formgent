/**
 * Internal dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	useBlockProps,
	InspectorAdvancedControls,
	BlockControls,
} from '@wordpress/block-editor';
import Controls from './Controls';
import { Fragment, useEffect, useState } from '@wordpress/element';
import { nanoid } from 'nanoid';
import { select, dispatch, useSelect } from '@wordpress/data';
import { addFilter } from '@wordpress/hooks';
import { registerBlockType } from '@wordpress/blocks';
import {
	TabPanel,
	PanelBody,
	__experimentalUseSlotFills as useSlotFills,
	Button,
	ToolbarGroup,
} from '@wordpress/components';
import ReactSVG from 'react-inlinesvg';
import editIcon from '@icon/edit.svg';
import cogIcon from '@icon/cog.svg';
import clsx from 'clsx';

const AdvancedControls = () => {
	const fills = useSlotFills( InspectorAdvancedControls.slotName );
	const hasFills = Boolean( fills && fills.length );

	if ( ! hasFills ) {
		return null;
	}

	return (
		<PanelBody
			className="block-editor-block-inspector__advanced formgent-advanced"
			title={ __( 'Block Advanced', 'formgent' ) }
			initialOpen={ false }
		>
			<InspectorControls.Slot group="advanced" />
		</PanelBody>
	);
};

function generateUniqueKey( baseKey, blocks ) {
	// Regex to match baseKey and any variations like baseKey, baseKey-1, baseKey-2, etc.
	const regex = new RegExp( `^${ baseKey }(?:-(\\d+))?$` );
	// Extract all matching names and their suffix numbers
	const suffixes = blocks
		.map( ( block ) => {
			if ( block.attributes && block.attributes.name ) {
				const match = block.attributes.name.match( regex );
				return match
					? match[ 1 ]
						? parseInt( match[ 1 ], 10 )
						: 0
					: null;
			}
			return null;
		} )
		.filter( ( suffix ) => suffix !== null );
	// If no suffixes are found, return the baseKey
	if ( suffixes.length === 0 ) {
		return baseKey;
	}

	// Find the highest suffix used
	const maxSuffix = Math.max( ...suffixes );

	// Return baseKey with an incremented suffix (baseKey-1, baseKey-2, etc.)
	return `${ baseKey }-${ maxSuffix + 1 }`;
}

function editorBlockValidation( props ) {
	const { attr_key, attributes, metaData } = props;
	//Only validate if the attribute key is 'name'
	if ( attr_key !== 'name' ) {
		return props;
	}

	const blockEditorStore = select( 'core/block-editor' );
	const selectedBlock = blockEditorStore.getSelectedBlock();
	const blocks = blockEditorStore.getBlocks();

	// Return early if no block is selected
	if ( ! selectedBlock ) {
		return props;
	}

	const parentIds = blockEditorStore.getBlockParents(
		selectedBlock.clientId
	);
	const maturedParent = blockEditorStore.getBlocksByClientId(
		parentIds[ parentIds.length - 1 ]
	);

	let allBlocksToCheck = [];

	if ( ! maturedParent.includes( null ) ) {
		let leafBlock = [];
		let siblingBlocks = [];

		if ( ! maturedParent[ 0 ].name.includes( 'formgent/' ) ) {
			blocks.forEach( ( block ) => {
				if ( block.innerBlocks.length === 0 ) {
					leafBlock.push( block );
				} else {
					siblingBlocks.push( block );
				}
			} );
			allBlocksToCheck = [
				...leafBlock,
				...mergeSiblingsBlocks(
					mergeInnerBlocks( maturedParent[ 0 ], parentIds )
				),
				...mergeSiblingsBlocks( siblingBlocks ),
			];
		} else {
			allBlocksToCheck = [
				...mergeSiblingsBlocks(
					mergeInnerBlocks( maturedParent[ 0 ], parentIds )
				),
			];
		}
	} else {
		let leafBlock = [];
		let siblingBlocks = [];
		let hostBlocks = [];
		blocks.forEach( ( block ) => {
			if ( block.innerBlocks.length === 0 ) {
				leafBlock.push( block );
			} else if ( block.name.includes( 'formgent/' ) ) {
				hostBlocks.push( block );
			} else {
				siblingBlocks.push( block );
			}
		} );

		allBlocksToCheck = leafBlock.concat(
			mergeSiblingsBlocks( siblingBlocks ),
			hostBlocks
		);
	}
	const isNameUsed = allBlocksToCheck
		.filter( ( block ) => block.clientId !== selectedBlock.clientId )
		.some( ( block ) => block.attributes.name === attributes[ attr_key ] );

	if ( isNameUsed ) {
		props.help = __( 'This name is already used.', 'doatmail' );
		props.isInvalid = true;
	}

	return props;
}

addFilter( 'formgent-field-text-control', 'formgent', function ( props ) {
	const { attr_key } = props;
	return editorBlockValidation( props );
} );

function mergeSiblingsBlocks( blocks ) {
	let mergedBlocks = [];
	blocks.forEach( ( block ) => {
		if (
			block.name.includes( 'formgent/' ) ||
			block.innerBlocks.length === 0
		) {
			if (
				! mergedBlocks.some(
					( existingBlock ) =>
						existingBlock.clientId === block.clientId
				)
			) {
				mergedBlocks.push( block );
			}
		}
	} );
	return mergedBlocks;
}

const mergeInnerBlocks = ( block, blockParentIds ) => {
	let mergeBlocks = [];
	const blockEditorStore = select( 'core/block-editor' );

	if ( block.innerBlocks ) {
		mergeBlocks = [ ...block.innerBlocks ];
	}
	if ( blockParentIds && blockParentIds.length > 1 ) {
		mergeBlocks = mergeParentBlocks(
			blockParentIds,
			mergeBlocks,
			blockEditorStore
		);
	}
	return mergeBlocks.filter( ( block ) => block.name !== 'core/group' );
};

function mergeParentBlocks( blockParentIds, mergeBlocks, blockEditorStore ) {
	let mergedParentBlocks = [ ...mergeBlocks ];
	for ( let i = blockParentIds.length - 1; i >= 0; i-- ) {
		const parent = blockEditorStore.getBlocksByClientId(
			blockParentIds[ i ]
		);
		const isAlreadyMerged = mergedParentBlocks.some(
			( block ) => block.clientId === parent[ 0 ].clientId
		);
		if ( ! isAlreadyMerged ) {
			mergedParentBlocks = mergedParentBlocks.concat( parent );
		}
	}
	return mergedParentBlocks;
}

const updateBlockAttributtes = ( blockId, name, filteredBlocks ) => {
	dispatch( 'core/block-editor' ).updateBlockAttributes( blockId, {
		id: nanoid( 12 ),
		name: generateUniqueKey( name, filteredBlocks ),
	} );
};

const getFilteredBlocks = ( blocksArray, id ) => {
	return blocksArray.filter( ( block ) => block.clientId !== id );
};

const widthOptions = [
	{ label: __( '100%', 'formgent' ), value: '100' },
	{ label: __( '75%', 'formgent' ), value: '75' },
	{ label: __( '50%', 'formgent' ), value: '50' },
	{ label: __( '33%', 'formgent' ), value: '33.33' },
	{ label: __( '25%', 'formgent' ), value: '25' },
];

const WidthControls = ( { attributes, setAttributes } ) => {
	return (
		<BlockControls>
			<ToolbarGroup className="formgent-toolbar">
				{ widthOptions.map( ( { label, value } ) => (
					<Button
						key={ value }
						variant="secondary"
						className={ clsx( {
							'is-selected': attributes.block_width === value,
						} ) }
						onClick={ () =>
							setAttributes( { block_width: value } )
						}
					>
						<span>{ label }</span>
					</Button>
				) ) }
			</ToolbarGroup>
		</BlockControls>
	);
};

function Block( {
	controls,
	Edit,
	attributes,
	setAttributes,
	metaData,
	clientId,
} ) {
	const blockProps = useBlockProps();
	const [ draggingEnded, setDraggingEnded ] = useState( false );
	const [ selectedTab, setSelectedTab ] = useState( '' );

	const isBeingDragged = useSelect(
		( select ) => {
			const { isBlockBeingDragged } = select( 'core/block-editor' );
			return isBlockBeingDragged( clientId );
		},
		[ clientId ]
	);

	useEffect( () => {
		// When dragging state changes
		if ( isBeingDragged ) {
			// Dragging started
			setDraggingEnded( false );
		} else if ( draggingEnded === false ) {
			// Dragging has ended
			setDraggingEnded( true );
		}
	}, [ isBeingDragged ] );

	// The value you need when dragging ends
	useEffect( () => {
		if ( draggingEnded ) {
			editorBlockValidation( {
				isInvalid: false,
				help: '',
				attr_key: 'name',
				attributes,
				metaData,
			} );
		}
	}, [ draggingEnded ] );

	useEffect( () => {
		const blockEditorStore = select( 'core/block-editor' );
		const blocks = blockEditorStore.getBlocks();
		const parentIds = blockEditorStore.getBlockParents(
			blockProps[ 'data-block' ]
		);

		const maturedParent = blockEditorStore.getBlocksByClientId(
			parentIds[ parentIds.length - 1 ]
		);
		const blockName = metaData.name;
		const currentId = attributes.id;
		const isNewBlock = ! currentId || currentId.length === 0;

		if ( isNewBlock ) {
			// If Parent blocks having child (Address, Name Block)
			if ( ! maturedParent.includes( null ) ) {
				let leafBlock = [];
				let siblingBlocks = [];
				let allBlocksToCheck = [];
				if ( ! maturedParent[ 0 ].name.includes( 'formgent/' ) ) {
					blocks.forEach( ( block ) => {
						if ( block.innerBlocks.length === 0 ) {
							leafBlock.push( block );
						} else {
							siblingBlocks.push( block );
						}
					} );
					allBlocksToCheck = [
						...leafBlock,
						...mergeSiblingsBlocks(
							mergeInnerBlocks( maturedParent[ 0 ], parentIds )
						),
						...mergeSiblingsBlocks( siblingBlocks ),
					];
				} else {
					allBlocksToCheck = [
						...mergeSiblingsBlocks(
							mergeInnerBlocks( maturedParent[ 0 ], parentIds )
						),
					];
				}
				const filteredChildBlocks = getFilteredBlocks(
					allBlocksToCheck,
					blockProps[ 'data-block' ]
				);
				setAttributes( {
					id: nanoid( 12 ),
					name: generateUniqueKey(
						attributes.name.replace( /-\d+$/, '' ),
						filteredChildBlocks
					),
				} );
			} else {
				let leafBlock = [];
				let siblingBlocks = [];
				let hostBlocks = [];
				blocks.forEach( ( block ) => {
					if ( block.innerBlocks.length === 0 ) {
						leafBlock.push( block );
					} else if ( block.name.includes( 'formgent/' ) ) {
						hostBlocks.push( block );
					} else {
						siblingBlocks.push( block );
					}
				} );

				const allBlocksToCheck = leafBlock.concat(
					mergeSiblingsBlocks( siblingBlocks ),
					hostBlocks
				);

				//Hiving no child
				// All blocks of the same type, excluding the current block
				const filteredBlocks = getFilteredBlocks(
					allBlocksToCheck,
					blockProps[ 'data-block' ]
				);
				setAttributes( {
					id: nanoid( 12 ),
					name: generateUniqueKey(
						blockName.substring( 'formgent/'.length ),
						filteredBlocks
					),
				} );
			}
		} else {
			const selectedBlock = blockEditorStore.getSelectedBlock();
			//If Blocks are duplicated
			// If Parent blocks having child (Address, Name Block)
			if ( ! maturedParent.includes( null ) ) {
				if (
					selectedBlock &&
					selectedBlock.name.includes( 'formgent/' )
				) {
					const duplicatedChildBlocks =
						maturedParent[ 0 ].innerBlocks.filter(
							( childBlock ) =>
								childBlock.attributes.id === currentId
						);
					if ( duplicatedChildBlocks[ 1 ] ) {
						//skip current duplicated block
						const filteredChildBlocks = getFilteredBlocks(
							blocks,
							duplicatedChildBlocks[ 1 ].clientId
						);

						updateBlockAttributtes(
							duplicatedChildBlocks[ 1 ].clientId,
							attributes.name.replace( /-\d+$/, '' ),
							filteredChildBlocks
						);
					}
				} else {
					const duplicatedChildBlocks = blocks.filter(
						( childBlock ) => childBlock.attributes.id === currentId
					);
				}
				//Filter duplicated blocks
			} else {
				//Hiving no child
				//Filter duplicated blocks
				const duplicateBlocks = blocks.filter(
					( block ) => block.attributes.id === currentId
				);
				if ( duplicateBlocks[ 1 ] ) {
					//skip current duplicated block
					const filteredBlocks = getFilteredBlocks(
						blocks,
						duplicateBlocks[ 1 ].clientId
					);
					updateBlockAttributtes(
						duplicateBlocks[ 1 ].clientId,
						blockName.substring( 'formgent/'.length ),
						filteredBlocks
					);
				}
			}
		}
	}, [] );

	return (
		<>
			<div
				{ ...blockProps }
				className={ `${
					blockProps.className
				} formgent-block-width-${ Math.trunc(
					attributes.block_width
				) }` }
			>
				<Edit
					attributes={ attributes }
					setAttributes={ setAttributes }
				/>
			</div>
			<WidthControls
				attributes={ attributes }
				setAttributes={ setAttributes }
			/>
			<InspectorControls>
				<div className="formgent">
					<TabPanel
						className={ `control-tabs control-tabs--${ selectedTab }` }
						tabs={ [
							{
								name: 'general',
								icon: (
									<span className="formgent-control-tab-icon">
										<ReactSVG src={ editIcon } />{ ' ' }
										{ __( 'General', 'formgent' ) }
									</span>
								),
							},
							{
								name: 'advanced',
								icon: (
									<span className="formgent-control-tab-icon">
										<ReactSVG src={ cogIcon } />{ ' ' }
										{ __( 'Advanced', 'formgent' ) }
									</span>
								),
							},
						] }
						onSelect={ ( tabName ) => {
							setSelectedTab( tabName );
						} }
					>
						{ ( tab ) => {
							if ( tab.name === 'general' ) {
								return (
									<Controls
										controls={ controls.generalControls }
										attributes={ attributes }
										setAttributes={ setAttributes }
										metaData={ metaData }
									/>
								);
							}

							if ( tab.name === 'advanced' ) {
								return (
									<Fragment>
										<Controls
											controls={
												controls.advancedControls
											}
											attributes={ attributes }
											setAttributes={ setAttributes }
											metaData={ metaData }
										/>
										<AdvancedControls />
									</Fragment>
								);
							}
							return null;
						} }
					</TabPanel>
				</div>
			</InspectorControls>
		</>
	);
}

export function registerBlock(
	metadata,
	controls,
	Edit,
	icon = 'smiley',
	exampleAttributes = {},
	props = {}
) {
	if ( 'formgent_form' === typenow ) {
		registerBlockType( metadata.name, {
			icon,
			example: {
				attributes: exampleAttributes,
			},
			edit: function ( { attributes, setAttributes, clientId } ) {
				return (
					<Block
						controls={ controls }
						Edit={ Edit }
						attributes={ attributes }
						setAttributes={ setAttributes }
						metaData={ metadata }
						clientId={ clientId }
					/>
				);
			},
			...props,
		} );
	}
}

export const onChangeChoiceOptions = (
	id,
	fieldKey,
	value,
	attr_key,
	attributes,
	setAttributes
) => {
	const newFields = attributes[ attr_key ].map( ( item ) => {
		if ( item.id !== id ) {
			return item;
		}

		const values = { ...item, [ fieldKey ]: value };

		if ( 'label' === fieldKey && ! values.isCustomValue ) {
			values[ 'value' ] = value.trim().toLowerCase().replace( ' ', '-' );
		} else if ( 'value' === fieldKey ) {
			values[ 'isCustomValue' ] = true;
		}

		return values;
	} );

	setAttributes( { [ attr_key ]: newFields } );
};
