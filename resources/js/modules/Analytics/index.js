import { lazy } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { AnalyticsStyle } from './style';
import { registerIsProActive } from '@formgent/helper/registerApplyFilter';
import AnalyticStats from './components/AnalyticStats';
import AnalyticsProCta from './components/AnalyticsProCta';
import AnalyticsChart from '@formgent/admin/Slots/AnalyticsChart';
import QuestionsDropOff from '@formgent/admin/Slots/QuestionsDropOff';
import ReactSVG from 'react-inlinesvg';
import layerIcon from '@icon/layer.svg';
const FormHeader = lazy( () => import( '@formgent/components/FormHeader' ) );

function Analytics() {
	const isProActive = registerIsProActive();

	const { CommonReducer } = useSelect( ( select ) => {
		return select( 'formgent' ).getCommonState();
	}, [] );
	const { useParams } = CommonReducer?.routerComponents;
	const { id: formId } = useParams();

	// forms data
	const { FormReducer } = useSelect( ( select ) => {
		return select( 'formgent' ).getForms();
	}, [] );
	const { isAnalyticsSummaryFetching } = FormReducer;

	// analytics summary stats
	const analyticsSummary = useSelect(
		( select ) => {
			return select( 'formgent' ).getAnalyticsSummary( formId );
		},
		[ formId ]
	);
	const {
		total_views,
		total_stared,
		total_finished,
		average_completion_time,
	} = analyticsSummary;

	return (
		<>
			<FormHeader resultHeader />
			<AnalyticsStyle>
				<div
					className={ `formgent-analytics-container ${
						! isProActive ? 'formgent-analytics-container--pro' : ''
					}` }
				>
					<AnalyticStats
						totalView={ total_views }
						totalStarted={ total_stared }
						totalFinished={ total_finished }
						timeToComplete={ average_completion_time }
					/>
					{ isProActive && (
						<>
							<AnalyticsChart.Slot
								fillProps={ {
									formId,
									isAnalyticsSummaryFetching,
								} }
							>
								{ ( fills ) => <>{ fills }</> }
							</AnalyticsChart.Slot>

							<QuestionsDropOff.Slot
								fillProps={ {
									layerIcon: <ReactSVG src={ layerIcon } />,
									formId,
								} }
							>
								{ ( fills ) => <>{ fills }</> }
							</QuestionsDropOff.Slot>
						</>
					) }
				</div>
				{ ! isProActive && <AnalyticsProCta /> }
			</AnalyticsStyle>
		</>
	);
}

export default function AnalyticsModule( props ) {
	return <Analytics { ...props } />;
}
