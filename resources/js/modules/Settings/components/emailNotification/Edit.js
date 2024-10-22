import { useEffect } from '@wordpress/element';
import { useSelect, useDispatch, resolveSelect } from '@wordpress/data';
import { Loader } from '@formgent/components';
import { SettingsContentStyle } from '../style';
import EditForm from './EditForm';

export default function Edit() {
	const params = new URL( document.location.toString() ).searchParams;
	const formID = parseInt( params.get( 'post' ) );
	const { resetEmailNotificationSingle } = useDispatch( 'formgent' );

	const { state, navigateTo, notificationId } = useSelect(
		( select ) => {
			const { CommonReducer, EmailNotificationSingleReducer } =
				select( 'formgent' ).getCommonState();

			const { useParams, useNavigate } = CommonReducer.routerComponents;
			const { email_notification_id } = useParams();
			const notificationId = email_notification_id;
			const navigateTo = useNavigate();

			return {
				state: EmailNotificationSingleReducer,
				navigateTo,
				notificationId,
			};
		},
		[ formID ]
	);

	useEffect( () => {
		if ( notificationId ) {
			resolveSelect( 'formgent' ).fetchEmailNotificationSingle(
				notificationId,
				Date.now()
			);
		}
		resolveSelect( 'formgent' ).fetchEmailNotificationSinglePresetFields(
			formID
		);
	}, [ notificationId, formID ] );

	useEffect( () => {
		if ( ! notificationId ) {
			resetEmailNotificationSingle();
		}
	}, [ notificationId, resetEmailNotificationSingle ] );

	useEffect( () => {
		if ( state.isCreated === true ) {
			navigateTo( '/email-notifications' );
		}
	}, [ state.isCreated, navigateTo ] );

	function filterNullItems( values ) {
		for ( const key of Object.keys( values ) ) {
			if ( values[ key ] === null ) {
				delete values[ key ];
			}
		}
		return values;
	}

	function onSubmit( values ) {
		values = filterNullItems( {
			...state.initialValues,
			...values,
			form_id: parseInt( formID ),
		} );

		if ( values.hasOwnProperty( 'id' ) ) {
			delete values.id;
		}

		if ( state.id ) {
			resolveSelect( 'formgent' ).updateEmailNotificationSingle(
				state.id,
				values,
				Date.now()
			);
		} else {
			values = { ...values, status: 'publish' };
			resolveSelect( 'formgent' ).createEmailNotificationSingle(
				values,
				Date.now()
			);
		}
	}

	return (
		<SettingsContentStyle className="formgent-settings-content">
			<Loader
				isLoading={
					state.isLoading.initialValues ||
					state.isLoading.presetFields
				}
			>
				<EditForm
					isEdit={ !! state.id }
					initialValues={ state.id ? state.initialValues : {} }
					isProcessing={
						state.isLoading.createData || state.isLoading.updateData
					}
					responseStatus={ state.responseStatus }
					presetFields={ state.presetFields }
					onSubmit={ onSubmit }
					onCancel={ () => navigateTo( '/email-notifications' ) }
				/>
			</Loader>
		</SettingsContentStyle>
	);
}
