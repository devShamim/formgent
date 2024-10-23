import AnalyticsChart from '@formgent/admin/Slots/AnalyticsChart';
import QuestionsDropOff from '@formgent/admin/Slots/QuestionsDropOff';
import SettingsWebhooks from '@formgent/admin/Slots/SettingsWebhooks';
import SettingsWebhooksEdit from '@formgent/admin/Slots/SettingsWebhooksEdit';
import { registerModule } from '@formgent/modules/helpers';
import { registerBlock } from './../../blocks/utils';

import SettingsModule from './Settings';
import FormTableModule from './FormTable';
import ResponseTableModule from './ResponseTable';
import SummaryModule from './Summary';
import AnalyticsModule from './Analytics';
import WebhooksModule from './Settings/components/webhooks/Webhooks';

registerModule( 'modules', {
	SettingsModule,
	FormTableModule,
	ResponseTableModule,
	AnalyticsModule,
	registerBlock,
	SummaryModule,
	WebhooksModule,
	AnalyticsChart,
	QuestionsDropOff,
	SettingsWebhooks,
	SettingsWebhooksEdit,
} );

/**
 * Exporting for code editor intellisense support.
 */
export {
	AnalyticsChart,
	AnalyticsModule,
	FormTableModule,
	WebhooksModule,
	QuestionsDropOff,
	registerBlock,
	ResponseTableModule,
	SettingsModule,
	SummaryModule,
	SettingsWebhooks,
	SettingsWebhooksEdit,
};
