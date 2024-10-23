import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function Save( { attributes } ) {
	return (
		<div
			className={ `formgent-editor-block-list__single formgent-block-width-${ Math.trunc(
				attributes.block_width
			) }` }
		>
			<span
				className={ `formgent-editor-block-list__single__label-container formgent-label-${ attributes.label_alignment }` }
			>
				{ attributes.label }
			</span>
			<div
				{ ...useBlockProps.save() }
				className="formgent-editor-block-list"
			>
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
