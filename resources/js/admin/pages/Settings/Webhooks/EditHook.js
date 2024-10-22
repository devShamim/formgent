import { useSelect } from '@wordpress/data';
import HookFormHeader from './components/HookFormHeader';
import HookForm from './components/HookForm';
import { SettingsContentStyle } from '../style';

export default function EditHook() {
	const { CommonReducer } = useSelect( ( select ) => {
		return select( 'formgent' ).getCommonState();
	}, [] );

	const { useParams, useNavigate } = CommonReducer.routerComponents;

	const { metaId } = useParams();
	const { singleWebhook } = useSelect(
		( select ) => {
			return {
				singleWebhook: select( 'formgent' ).getSingleHook( metaId ),
			};
		},
		[ metaId ]
	);

	console.log( 'singleWebhook' );
	return (
		<SettingsContentStyle className="formgent-settings-content">
			<HookFormHeader title="Update webhook" />
			<HookForm />
		</SettingsContentStyle>
	);
}
