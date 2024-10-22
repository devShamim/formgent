import { Fragment } from '@wordpress/element';
import HookFormHeader from './components/HookFormHeader';
import HookForm from './components/HookForm';
import { SettingsContentStyle } from '../style';

export default function CreateHook() {
	return (
		<SettingsContentStyle className="formgent-settings-content">
			<HookFormHeader title="Create new webhook" />
			<HookForm />
		</SettingsContentStyle>
	);
}
