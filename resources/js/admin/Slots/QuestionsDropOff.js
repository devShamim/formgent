import { createSlotFill } from '@wordpress/components';
import PropTypes from 'prop-types';

const { Fill, Slot } = createSlotFill( 'QuestionsDropOff' );

const QuestionsDropOff = ( { render: ChildComponent } ) => (
	<Fill>{ ( props ) => <ChildComponent { ...props } /> }</Fill>
);

QuestionsDropOff.Slot = Slot;

QuestionsDropOff.propTypes = {
	render: PropTypes.elementType.isRequired,
};

export default QuestionsDropOff;
