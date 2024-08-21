import { InnerBlocks } from '@wordpress/block-editor';

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
		'core/paragraph',
		{
			content: '<strong>Name</strong>',
			className: 'has-medium-font-size',
		},
	],
	[
		'core/group',
		{
			layout: { type: 'grid', minimumColumnWidth: null, columnCount: 3 },
			style: { spacing: { blockGap: 'var:preset|spacing|20' } },
		},
		[
			[
				'formgent/text',
				{
					label: 'First Name',
					label_alignment: 'top',
					name: 'first_name',
					metadata: { name: 'First Name' },
				},
			],
			[
				'formgent/text',
				{
					label: 'Middle Name',
					label_alignment: 'top',
					name: 'middle_name',
					metadata: { name: 'Middle Name' },
				},
			],
			[
				'formgent/text',
				{
					label: 'Last Name',
					label_alignment: 'top',
					name: 'last_name`',
					metadata: { name: 'Last Name' },
				},
			],
		],
	],
];

export default function Edit() {
	return (
		<InnerBlocks allowedBlocks={ ALLOWED_BLOCKS } template={ TEMPLATE } />
	);
}
