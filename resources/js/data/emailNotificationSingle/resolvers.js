import { EmailNotificationSingleActions as Actions } from './actions';
import { getErrorMessage } from '../utils';

export const EmailNotificationSingleResolvers = {
	/**
	 * @param {number} id
	 * @param {number} timestamp
	 */
	*fetchEmailNotificationSingle( id, timestamp = 0 ) {
		try {
			if (
				typeof id === 'undefined' ||
				isNaN( parseInt( id ) ) ||
				`${ id }` === '0'
			) {
				yield Actions.updateIsNotFoundEmailNotificationSingle( true );
				return;
			}

			id = parseInt( id );

			yield Actions.updateEmailNotificationSingleID( id );

			yield Actions.updateEmailNotificationSingleResponseStatus( null );

			yield Actions.updateIsLoadingEmailNotificationSingle(
				'initialValues',
				true
			);

			const data = yield Actions.fetchEmailNotificationSingle(
				id,
				timestamp
			);

			yield Actions.updateEmailNotificationSingleInitialValues(
				data.email
			);

			yield Actions.updateIsLoadingEmailNotificationSingle(
				'initialValues',
				false
			);
		} catch ( error ) {
			yield Actions.updateEmailNotificationSingleResponseStatus( {
				success: false,
				message: getErrorMessage( error ),
			} );

			yield Actions.updateIsLoadingEmailNotificationSingle(
				'initialValues',
				false
			);

			if ( 404 === error.data.status_code ) {
				yield Actions.updateIsNotFoundEmailNotificationSingle( true );
			}
		}
	},

	/**
	 * @param {number} formID
	 * @param {number} timestamp
	 */
	*fetchEmailNotificationSinglePresetFields( formID, timestamp = 0 ) {
		try {
			if ( typeof formID === 'undefined' ) {
				return;
			}

			if ( isNaN( parseInt( formID ) ) || `${ formID }` === '0' ) {
				return;
			}

			formID = parseInt( formID );

			yield Actions.updateIsLoadingEmailNotificationSingle(
				'presetFields',
				true
			);

			const data =
				yield Actions.fetchEmailNotificationSinglePresetFields(
					formID
				);

			yield Actions.updateEmailNotificationSinglePresetFields(
				data.preset_fields
			);

			yield Actions.updateIsLoadingEmailNotificationSingle(
				'presetFields',
				false
			);
		} catch ( error ) {
			yield Actions.updateIsLoadingEmailNotificationSingle(
				'presetFields',
				false
			);
		}
	},

	/**
	 * @param {object} data
	 * @param {number} timestamp
	 */
	*createEmailNotificationSingle( data, timestamp = 0 ) {
		try {
			yield Actions.updateIsLoadingEmailNotificationSingle(
				'createData',
				true
			);

			yield Actions.updateIsLoadingEmailNotificationSingle(
				'initialValues',
				false
			);

			yield Actions.updateEmailNotificationSingleResponseStatus( null );

			yield Actions.createEmailNotificationSingle( data );

			yield Actions.updateIsCreatedEmailNotificationSingle( true );

			yield Actions.updateRefreshEmailNotifications( true );
		} catch ( error ) {
			yield Actions.updateEmailNotificationSingleResponseStatus( {
				success: false,
				message: getErrorMessage( error ),
			} );

			yield Actions.updateIsLoadingEmailNotificationSingle(
				'createData',
				false
			);
		}
	},

	/**
	 * @param {object} data
	 * @param {number} timestamp
	 */
	*updateEmailNotificationSingle( id, data, timestamp = 0 ) {
		try {
			yield Actions.updateIsLoadingEmailNotificationSingle(
				'updateData',
				true
			);

			yield Actions.updateEmailNotificationSingleResponseStatus( null );

			const response = yield Actions.updateEmailNotificationSingle(
				id,
				data
			);

			yield Actions.updateEmailNotificationSingleResponseStatus( {
				success: true,
				message: response.message,
			} );

			yield Actions.updateIsLoadingEmailNotificationSingle(
				'updateData',
				false
			);
		} catch ( error ) {
			yield Actions.updateEmailNotificationSingleResponseStatus( {
				success: false,
				message: getErrorMessage( error ),
			} );

			yield Actions.updateIsLoadingEmailNotificationSingle(
				'updateData',
				false
			);
		}
	},
};
