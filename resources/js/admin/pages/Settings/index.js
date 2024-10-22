import { SettingsModule } from '@formgent/modules';
import { addFilter } from '@wordpress/hooks';
// Import Settings Pages
import IntegrationsChild1 from './IntegrationsChild1.js';
import IntegrationsChild2 from './IntegrationsChild2.js';
import IntegrationsChild3 from './IntegrationsChild3.js';
import Webhooks from './Webhooks/index.js';

// Add filter to extend settings routes
addFilter(
	'formgent_settings_routes_integrations',
	'formgent/settings/routes',
	( routes ) => {
		return [
			...routes,
			{
				key: 'integrations',
				label: 'Integrations',
				children: [
					{
						key: 'webhooks',
						label: 'Webhooks',
						path: 'webhooks',
						element: <Webhooks />,
					},
					{
						key: 'integrations/child1',
						label: 'Integrations Child 1',
						path: 'integrations/child1',
						element: <IntegrationsChild1 />,
					},
					{
						key: 'integrations/child2',
						label: 'Integrations Child 2',
						path: 'integrations/child2',
						element: <IntegrationsChild2 />,
					},
					{
						key: 'integrations/child3',
						label: 'Integrations Child 3',
						path: 'integrations/child3',
						element: <IntegrationsChild3 />,
					},
				],
			},
		];
	}
);

export default function Settings() {
	return <SettingsModule />;
}
