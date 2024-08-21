/**
 * Internal dependencies
 */
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import { useEffect, useState } from '@wordpress/element';
import ServerSideRender from '@wordpress/server-side-render';
import './editor.scss';

const Form = ( { formId } ) => {
	return (
		<ServerSideRender
			block="formgent/form"
			attributes={ {
				formId,
			} }
		/>
	);
};

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit( { attributes, setAttributes } ) {
	const { formId } = attributes;
	const [ options, setOptions ] = useState( [] );

	const onChangeForm = ( formId ) => {
		setAttributes( { formId: parseInt( formId ) } );
	};

	useEffect( () => {
		apiFetch( { path: '/formgent/admin/forms/select' } ).then(
			( response ) => {
				setOptions( [
					{
						label: __( '-- Select a Form --', 'formgent' ),
						value: 0,
					},
					...response.forms.map( ( form ) => {
						form.value = parseInt( form.value );
						return form;
					} ),
				] );

				const formExists = response.forms.some(
					( form ) => form.value === formId
				);

				/**
				 * If the form does not exist then resetting it.
				 */
				if ( ! formExists ) {
					onChangeForm( 0 );
				}
			}
		);
	}, [] );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'General', 'formgent' ) }>
					<SelectControl
						label={ __( 'SELECT A FORM', 'formgent' ) }
						value={ formId }
						options={ options }
						onChange={ onChangeForm }
						size="__unstable-large"
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...useBlockProps() }>
				{ 0 === formId ? (
					<>
						<h3>FormGent Logo</h3>
						<SelectControl
							label={ __( 'SELECT A FORM', 'formgent' ) }
							value={ formId }
							options={ options }
							onChange={ onChangeForm }
						/>
					</>
				) : (
					<Form formId={ formId } />
				) }
			</div>
		</>
	);
}
