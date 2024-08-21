import { registerModule } from '@formgent/modules/helpers';
import { lazy } from '@wordpress/element';
import { registerBlock } from './../../blocks/utils';

const SettingsModule = lazy( () => import( './Settings' ) );
const FormTableModule = lazy( () => import( './FormTable' ) );
const ResponseTableModule = lazy( () => import( './ResponseTable' ) );

registerModule( 'modules', {
	SettingsModule,
	FormTableModule,
	ResponseTableModule,
	registerBlock,
} );

/**
 * Exporting for code editor intellisense support.
 */
export { FormTableModule, registerBlock, ResponseTableModule, SettingsModule };
