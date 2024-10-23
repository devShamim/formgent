import { lazy } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { registerIsProActive } from '@formgent/helper/registerApplyFilter';
import SettingsWebhooks from '@formgent/admin/Slots/SettingsWebhooks';
import ReactSVG from 'react-inlinesvg';
import layerIcon from '@icon/layer.svg';
import AnalyticsProCta from '@formgent/modules/Analytics/components/AnalyticsProCta';
import { __ } from '@wordpress/i18n';

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
				{ ! isProActive && (
					<AnalyticsProCta
						title={ __( 'Webhooks Settings', 'formgent' ) }
						description={ __(
							'Upgrade to access advanced webhook settings and automate your integrations.',
							'formgent'
						) }
						buttonValue={ __(
							'Upgrade to use Webhooks',
							'formgent'
						) }
						background={ false }
					/>
				) }
			</div>
		</>
	);
}

export default function WebhooksModule( props ) {
	return <Webhooks { ...props } />;
}
