import { useDispatch } from '@wordpress/data';
import { doAction } from '@wordpress/hooks';
import patchData from '@formgent/helper/patchData';
import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';
import { AntSwitch } from '@formgent/components';

export default function FormTableStatus( props ) {
	const { form, isStatusUpdating, singleStatusUpdated } = props;
	const { id, status } = form;
	const [ currentStatus, setCurrentStatus ] = useState( status );
	const { updateStatusRequest, updateStatusSuccess, updateStatusError } =
		useDispatch( 'formgent' );

	async function handleUpdateFormStatus( isChecked ) {
		setCurrentStatus( isChecked ? 'publish' : 'draft' );
		updateStatusRequest();
		try {
			const statusUpdateResponse = await patchData(
				`admin/forms/${ id }/status`,
				{ status: String( isChecked ? 'publish' : 'draft' ) }
			);
			doAction( 'formgent-toast', {
				message: statusUpdateResponse.message,
			} );
			updateStatusSuccess( {
				...form,
				status: currentStatus,
			} );
		} catch ( error ) {
			updateStatusError( error );
		}
	}

	useEffect( () => {
		if ( singleStatusUpdated ) return;
		setCurrentStatus( status );
	}, [ status, ! singleStatusUpdated ] );

	return (
		<div className="formgent-toggle">
			<AntSwitch
				checked={ currentStatus === 'publish' }
				onChange={ ( isChecked ) => {
					handleUpdateFormStatus( isChecked );
				} }
				loading={ isStatusUpdating }
			/>
			<span>{ currentStatus === 'publish' ? 'Active' : 'Inactive' }</span>
		</div>
	);
}
