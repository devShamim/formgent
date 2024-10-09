import { dispatch } from '@wordpress/data';
import { Button, Modal } from '@wordpress/components';
import { useState } from '@wordpress/element';
import domReady from '@wordpress/dom-ready';
import { registerPlugin } from '@wordpress/plugins';
import { PluginDocumentSettingPanel } from '@wordpress/editor';
import ReactSVG from 'react-inlinesvg';
import ellipsisH from '@icon/ellipsis-h.svg';
import { __ } from '@wordpress/i18n';

/**
 * Initially open editor left and right both sidebar
 */
domReady( function () {
	setTimeout( function () {
		dispatch( 'core/editor' ).setIsInserterOpened( true );
		dispatch( 'core/edit-post' ).openGeneralSidebar( 'edit-post/document' );
	}, 0 );
} );

const FormgentFormSettings = () => {
	const [ isOpen, setOpen ] = useState( false );
	const openSettingsModal = () => setOpen( true );
	const closeSettingsModal = () => setOpen( false );
	return (
		<PluginDocumentSettingPanel
			name="custom-panel"
			className="formgent-form-settings-panel"
		>
			<span
				className="formgent-form-settings-panel__title"
				onClick={ openSettingsModal }
			>
				{ __( 'General Settings', 'formgent' ) }
				<ReactSVG src={ ellipsisH } />
			</span>

			{ isOpen && (
				<Modal
					title={ __( 'Settings', 'formgent' ) }
					className="formgent-form-settings-modal"
					onRequestClose={ closeSettingsModal }
					isFullScreen
				>
					<div className="formgent-form-settings-modal__body">
						modal content
					</div>
				</Modal>
			) }
		</PluginDocumentSettingPanel>
	);
};

registerPlugin( 'formgent-form-settings', {
	render: FormgentFormSettings,
} );
