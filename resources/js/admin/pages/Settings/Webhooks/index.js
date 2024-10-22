import Header from './components/Header';
import Table from './components/Table';
import { SettingsContentStyle } from '../style';

export default function Webhooks() {
	return (
		<SettingsContentStyle className="formgent-settings-content">
			<Header />
			<Table />
		</SettingsContentStyle>
	);
}
