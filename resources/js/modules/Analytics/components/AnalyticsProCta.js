import ReactSVG from 'react-inlinesvg';
import analyticsProBg from '@image/analytics-pro.png';
import lineChartIcon from '@icon/line-chart.svg';
import { __ } from '@wordpress/i18n';

export default function AnalyticsProCta() {
	return (
		<div className="formgent-analytics-pro-cta">
			<img src={ analyticsProBg } alt="Analytics Pro" />
			<div className="formgent-analytics-pro-cta__content">
				<div className="formgent-analytics-pro-cta__icon">
					<ReactSVG src={ lineChartIcon } />
				</div>
				<h2 className="formgent-analytics-pro-cta__title">
					{ __( 'Conversation analytics', 'formgent' ) }
				</h2>
				<p className="formgent-analytics-pro-cta__description">
					{ __(
						'Track drop-off rates for each question of your form',
						'formgent'
					) }
				</p>
				<a
					href="#"
					className="formgent-analytics-pro-cta__btn"
					target="_blank"
				>
					{ __( 'Upgrade to view analytics', 'formgent' ) }
				</a>
			</div>
		</div>
	);
}
