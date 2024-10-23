import { createSlotFill } from '@wordpress/components';
import PropTypes from 'prop-types';

const { Fill, Slot } = createSlotFill( 'SettingsWebhooksEdit' );

const SettingsWebhooksEdit = ( { render: ChildComponent } ) => (
	<Fill>{ ( props ) => <ChildComponent { ...props } /> }</Fill>
);

SettingsWebhooksEdit.Slot = Slot;

SettingsWebhooksEdit.propTypes = {
	render: PropTypes.elementType.isRequired,
};

export default SettingsWebhooksEdit;
