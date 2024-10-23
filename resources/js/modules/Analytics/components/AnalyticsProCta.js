import ReactSVG from 'react-inlinesvg';
import analyticsProBg from '@image/analytics-pro.png';
import lineChartIcon from '@icon/line-chart.svg';
import { __ } from '@wordpress/i18n';

export default function AnalyticsProCta( {
	title,
	description,
	background,
	buttonValue,
} ) {
	return (
		<div className="formgent-analytics-pro-cta">
			{ background && <img src={ analyticsProBg } alt="Analytics Pro" /> }
			<div className="formgent-analytics-pro-cta__content">
				<div className="formgent-analytics-pro-cta__icon">
					<ReactSVG src={ lineChartIcon } />
				</div>
				<h2 className="formgent-analytics-pro-cta__title">{ title }</h2>
				<p className="formgent-analytics-pro-cta__description">
					{ description }
				</p>
				<a
					href="#"
					className="formgent-analytics-pro-cta__btn"
					target="_blank"
				>
					{ buttonValue }
				</a>
			</div>
		</div>
	);
}
