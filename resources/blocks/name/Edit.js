import { InnerBlocks } from '@wordpress/block-editor';
import { RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

import './editor.scss';

const ALLOWED_BLOCKS = [
	'core/paragraph',
	'core/heading',
	'formgent/text',
	'core/group',
	'core/spacer',
];

const TEMPLATE = [
	[
		'formgent/text',
		{
			label: 'First Name',
			label_alignment: 'top',
			name: 'first_name',
			block_width: '33.33',
			metadata: { name: 'First Name' },
		},
	],
	[
		'formgent/text',
		{
			label: 'Middle Name',
			label_alignment: 'top',
			name: 'middle_name',
			block_width: '33.33',
			metadata: { name: 'Middle Name' },
		},
	],
	[
		'formgent/text',
		{
			label: 'Last Name',
			label_alignment: 'top',
			name: 'last_name`',
			block_width: '33.33',
			metadata: { name: 'Last Name' },
		},
	],
];

export default function Edit( { attributes, setAttributes } ) {
	return (
		<div className={ `formgent-editor-block-list__single` }>
			<div
				className={ `formgent-editor-block-list__single__label-container` }
			>
				<RichText
					className="formgent-editor-block-list__single__label"
					tagName="label"
					value={ attributes.label }
					onChange={ ( content ) =>
						setAttributes( { label: content } )
					}
					placeholder={ __( 'Type your label' ) }
				/>
			</div>
			<InnerBlocks
				allowedBlocks={ ALLOWED_BLOCKS }
				template={ TEMPLATE }
			/>
		</div>
	);
}
