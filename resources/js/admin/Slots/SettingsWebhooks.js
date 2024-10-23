import { createSlotFill } from '@wordpress/components';
import PropTypes from 'prop-types';

const { Fill, Slot } = createSlotFill( 'SettingsWebhooks' );

const SettingsWebhooks = ( { render: ChildComponent } ) => (
	<Fill>{ ( props ) => <ChildComponent { ...props } /> }</Fill>
);

SettingsWebhooks.Slot = Slot;

SettingsWebhooks.propTypes = {
	render: PropTypes.elementType.isRequired,
};

export default SettingsWebhooks;
