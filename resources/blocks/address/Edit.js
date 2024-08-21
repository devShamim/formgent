import { InnerBlocks } from '@wordpress/block-editor';

import './editor.scss';

const ALLOWED_BLOCKS = [
	'core/paragraph',
	'core/heading',
	'formgent/text',
	'formgent/number',
	'formgent/country',
	'core/columns',
	'core/column',
	'core/group',
	'core/spacer',
];

const TEMPLATE = [
	[
		'core/paragraph',
		{
			content: '<strong>Address</strong>',
			className: 'has-medium-font-size',
		},
	],
	[
		'formgent/text',
		{
			label: 'Address line 1',
			label_alignment: 'top',
			name: 'address_line_one',
			metadata: { name: 'Address line 1' },
		},
	],
	[
		'core/spacer',
		{
			height: '20px',
		},
	],
	[
		'formgent/text',
		{
			label: 'Address line 2',
			label_alignment: 'top',
			name: 'address_line_two',
			metadata: { name: 'Address line 2' },
		},
	],
	[
		'core/spacer',
		{
			height: '20px',
		},
	],
	[
		'core/group',
		{
			layout: { type: 'grid', minimumColumnWidth: null, columnCount: 2 },
			style: { spacing: { blockGap: 'var:preset|spacing|10' } },
		},
		[
			[
				'formgent/text',
				{
					label: 'City',
					label_alignment: 'top',
					name: 'city',
					metadata: { name: 'City' },
				},
			],
			[
				'formgent/text',
				{
					label: 'State / Province',
					label_alignment: 'top',
					name: 'state',
					metadata: { name: 'State / Province' },
				},
			],
		],
	],
	[
		'core/spacer',
		{
			height: '20px',
		},
	],
	[
		'core/group',
		{
			layout: { type: 'grid', minimumColumnWidth: null, columnCount: 2 },
			style: { spacing: { blockGap: 'var:preset|spacing|10' } },
		},
		[
			[
				'formgent/text',
				{
					label: 'Postal code / Zip Code',
					label_alignment: 'top',
					name: 'zip_code',
					metadata: { name: 'Postal code / Zip Code' },
				},
			],
			[
				'formgent/text',
				{
					label: 'Country',
					label_alignment: 'top',
					name: 'country',
					metadata: { name: 'Country' },
				},
			],
		],
	],
	[
		'core/spacer',
		{
			height: '30px',
		},
	],
];

export default function Edit() {
	return (
		<InnerBlocks allowedBlocks={ ALLOWED_BLOCKS } template={ TEMPLATE } />
	);
}
