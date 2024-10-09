import ReactSVG from 'react-inlinesvg';
import eyeIcon from '@icon/eye.svg';
import clipboardIcon from '@icon/clipboard.svg';
import clipboardCheckIcon from '@icon/clipboard-check.svg';
import presentationIcon from '@icon/presentation.svg';
import clockIcon from '@icon/clock.svg';
import { __ } from '@wordpress/i18n';

export default function AnalyticStats( props ) {
	const { totalView, totalStarted, totalFinished, timeToComplete } = props;

	let completionRate = ( totalFinished / totalStarted ) * 100;
	completionRate =
		completionRate % 1 === 0 ? completionRate : completionRate.toFixed( 2 );

	function formatTime( seconds ) {
		const hours = Math.floor( seconds / 3600 );
		const minutes = Math.floor( ( seconds % 3600 ) / 60 );
		const remainingSeconds = seconds % 60;

		// Pad the hours, minutes, and seconds with a leading zero if they are less than 10
		const formattedHours = String( hours ).padStart( 2, '0' );
		const formattedMinutes = String( minutes ).padStart( 2, '0' );
		const formattedSeconds = String( remainingSeconds ).padStart( 2, '0' );

		return `${ formattedHours }:${ formattedMinutes }:${ formattedSeconds }`;
	}

	const formatTimeToComplete = formatTime( timeToComplete );

	const statsData = [
		{
			icon: eyeIcon,
			label: __( 'Views', 'formgent' ),
			total: totalView,
		},
		{
			icon: clipboardIcon,
			label: __( 'Started', 'formgent' ),
			total: totalStarted,
		},
		{
			icon: clipboardCheckIcon,
			label: __( 'Finished', 'formgent' ),
			total: totalFinished,
		},
		{
			icon: presentationIcon,
			label: __( 'Completion rate', 'formgent' ),
			total: isNaN( completionRate ) ? '0' : completionRate + '%',
		},
		{
			icon: clockIcon,
			label: __( 'Time to complete', 'formgent' ),
			total: formatTimeToComplete,
		},
	];

	return (
		<div className="formgent-analytics-stats">
			<div className="formgent-analytics-stats__list">
				{ statsData.map( ( stat, index ) => (
					<div
						className="formgent-analytics-stats__item"
						key={ index }
					>
						<div className="formgent-analytics-stats__icon">
							<ReactSVG src={ stat.icon } />
						</div>
						<div className="formgent-analytics-stats__content">
							<span>{ stat.label }</span>
							<strong>{ stat.total }</strong>
						</div>
					</div>
				) ) }
			</div>
		</div>
	);
}
