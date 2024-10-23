import { lazy } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { registerIsProActive } from '@formgent/helper/registerApplyFilter';
import SettingsWebhooks from '@formgent/admin/Slots/SettingsWebhooks';
import ReactSVG from 'react-inlinesvg';
import layerIcon from '@icon/layer.svg';

function Webhooks() {
	const isProActive = registerIsProActive();

	const { CommonReducer } = useSelect( ( select ) => {
		return select( 'formgent' ).getCommonState();
	}, [] );
	const { useParams } = CommonReducer?.routerComponents;
	const { id: formId } = useParams();

	// // forms data
	// const { FormReducer } = useSelect( ( select ) => {
	// 	return select( 'formgent' ).getForms();
	// }, [] );

	return (
		<>
			<div>
				<h1>Webhooks Settings</h1>
				{ isProActive && (
					<SettingsWebhooks.Slot
						fillProps={ {
							formId,
						} }
					>
						{ ( fills ) => <>{ fills }</> }
					</SettingsWebhooks.Slot>
				) }
				{ ! isProActive && <AnalyticsProCta /> }
			</div>
		</>
	);
}

export default function WebhooksModule( props ) {
	return <Webhooks { ...props } />;
}
