import { lazy } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { registerIsProActive } from '@formgent/helper/registerApplyFilter';
import SettingsWebhooksEdit from '@formgent/admin/Slots/SettingsWebhooksEdit';
import ReactSVG from 'react-inlinesvg';
import layerIcon from '@icon/layer.svg';

function CreateHooks() {
	const isProActive = registerIsProActive();

	const { CommonReducer } = useSelect( ( select ) => {
		return select( 'formgent' ).getCommonState();
	}, [] );
	const { useParams } = CommonReducer?.routerComponents;
	const { id: formId } = useParams();

	return (
		<>
			<div>
				<h1>Create Hooks</h1>
				{ isProActive && (
					<SettingsWebhooksEdit.Slot fillProps={ {} }>
						{ ( fills ) => <>{ fills }</> }
					</SettingsWebhooksEdit.Slot>
				) }
			</div>
		</>
	);
}

export default function CreateHooksModule( props ) {
	return <CreateHooks { ...props } />;
}
