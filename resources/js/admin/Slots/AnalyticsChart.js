import { createSlotFill } from '@wordpress/components';
import PropTypes from 'prop-types';

const { Fill, Slot } = createSlotFill( 'AnalyticsChart' );

const AnalyticsChart = ( { render: ChildComponent } ) => (
	<Fill>{ ( props ) => <ChildComponent { ...props } /> }</Fill>
);

AnalyticsChart.Slot = Slot;

AnalyticsChart.propTypes = {
	render: PropTypes.elementType.isRequired,
};

export default AnalyticsChart;
