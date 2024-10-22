import AnalyticsChart from '@formgent/admin/Slots/AnalyticsChart';
import QuestionsDropOff from '@formgent/admin/Slots/QuestionsDropOff';
import { registerModule } from '@formgent/modules/helpers';
import { registerBlock } from './../../blocks/utils';

import SettingsModule from './Settings';
import FormTableModule from './FormTable';
import ResponseTableModule from './ResponseTable';
import SummaryModule from './Summary';
import AnalyticsModule from './Analytics';

registerModule( 'modules', {
	SettingsModule,
	FormTableModule,
	ResponseTableModule,
	AnalyticsModule,
	registerBlock,
	SummaryModule,
	AnalyticsChart,
	QuestionsDropOff,
} );

/**
 * Exporting for code editor intellisense support.
 */
export {
	AnalyticsChart,
	AnalyticsModule,
	FormTableModule,
	QuestionsDropOff,
	registerBlock,
	ResponseTableModule,
	SettingsModule,
	SummaryModule,
};
