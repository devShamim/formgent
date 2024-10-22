import { EmailNotificationActions as Actions } from './actions';

export const EmailNotificationResolvers = {
	/**
	 * @param {object} queryArgs
	 * @param {number} queryArgs.page
	 * @param {number} queryArgs.per_page
	 * @param {number} timestamp
	 */
	*getEmailNotifications( queryArgs, timestamp = 0 ) {
		try {
			yield Actions.updateIsLoadingEmailNotifications( true );

			yield Actions.updateEmailNotificationResponseStatus( null );

			const defaultQueryArgs = {
				page: 1,
				per_page: 20,
				sort_by: 'date_created_desc',
			};

			const updatedQueryArgs = { ...defaultQueryArgs, ...queryArgs };

			const data =
				yield Actions.fetchEmailNotifications( updatedQueryArgs );

			yield Actions.updateEmailNotificationData( data.emails );

			yield Actions.updateEmailNotificationQueryArgs( updatedQueryArgs );
			yield Actions.updateEmailNotificationFoundItems(
				parseInt( data.total )
			);

			yield Actions.updateIsLoadingEmailNotifications( false );

			yield Actions.updateIsCreatedEmailNotificationSingle( false );
			yield Actions.updateIsLoadingEmailNotificationSingle(
				'initialValues',
				false
			);
			yield Actions.updateIsLoadingEmailNotificationSingle(
				'presetFields',
				false
			);
			yield Actions.updateIsLoadingEmailNotificationSingle(
				'createData',
				false
			);
			yield Actions.updateIsLoadingEmailNotificationSingle(
				'updateData',
				false
			);
		} catch ( error ) {
			yield Actions.updateEmailNotificationResponseStatus( {
				success: false,
				message: error.message,
			} );

			yield Actions.updateIsLoadingEmailNotifications( false );
		}
	},

	/**
	 * @param {number} id
	 * @param {string} status
	 * @param {number} timestamp
	 */
	*updateEmailNotificationStatus( id, status, timestamp = 0 ) {
		try {
			yield Actions.updateEmailNotificationItem( id, {
				isUpdatingStatus: true,
			} );

			yield Actions.updateEmailNotificationStatus( id, status );

			yield Actions.updateEmailNotificationItem( id, {
				status,
				isUpdatingStatus: false,
			} );
		} catch ( error ) {
			yield Actions.updateEmailNotificationItem( id, {
				isUpdatingStatus: false,
			} );
		}
	},

	/**
	 * @param {number} id
	 * @param {number} timestamp
	 */
	*duplicateEmailNotification( id, timestamp = 0 ) {
		try {
			yield Actions.updateEmailNotificationItem( id, {
				isDuplicating: true,
			} );

			yield Actions.updateIsProcessingEmailNotifications( true );

			yield Actions.duplicateEmailNotification( id );

			yield Actions.updateEmailNotificationItem( id, {
				isDuplicating: false,
			} );

			yield Actions.updateIsProcessingEmailNotifications( false );

			yield Actions.updateRefreshEmailNotifications( true );
		} catch ( error ) {
			yield Actions.updateEmailNotificationItem( id, {
				isDuplicating: false,
			} );
		}
	},

	/**
	 * @param {number} id
	 * @param {number} timestamp
	 */
	*deleteEmailNotification( id, timestamp = 0 ) {
		try {
			yield Actions.updateEmailNotificationItem( id, {
				isDeleting: true,
			} );

			yield Actions.deleteEmailNotification( id );
			yield Actions.updateRefreshEmailNotifications( true );
		} catch ( error ) {
			yield Actions.updateEmailNotificationItem( id, {
				isDeleting: false,
			} );
		}
	},
};
