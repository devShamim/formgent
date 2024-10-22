export const EmailNotificationActions = {
	/**
	 * @param {boolean} isLoading
	 */
	updateIsLoadingEmailNotifications: ( isLoading ) => ( {
		type: 'UPDATE_IS_LOADING_EMAIL_NOTIFICATIONS',
		payload: isLoading,
	} ),

	/**
	 * @param {boolean} isProcessing
	 */
	updateIsProcessingEmailNotifications: ( isProcessing ) => ( {
		type: 'UPDATE_PROCESSING_EMAIL_NOTIFICATIONS',
		payload: isProcessing,
	} ),

	/**
	 * @param {boolean} refresh
	 */
	updateRefreshEmailNotifications: ( refresh ) => ( {
		type: 'UPDATE_REFRESH_EMAIL_NOTIFICATIONS',
		payload: refresh,
	} ),

	/**
	 * @param {Array} data
	 */
	updateEmailNotificationData: ( data ) => ( {
		type: 'UPDATE_EMAIL_NOTIFICATION_DATA',
		payload: data,
	} ),

	/**
	 * @param {number} id
	 * @param {object} data
	 */
	updateEmailNotificationItem: ( id, data ) => ( {
		type: 'UPDATE_EMAIL_NOTIFICATION_ITEM',
		payload: { id, data },
	} ),

	/**
	 * @param {number} id
	 */
	deleteEmailNotificationItem: ( id ) => ( {
		type: 'DELETE_EMAIL_NOTIFICATION_ITEM',
		payload: { id },
	} ),

	/**
	 * @param {?object} status
	 * @param {boolean} status.success
	 * @param {string} status.message
	 */
	updateEmailNotificationResponseStatus: ( status ) => ( {
		type: 'UPDATE_EMAIL_NOTIFICATION_RESPONSE_STATUS',
		payload: status,
	} ),

	/**
	 * @param {object} queryArgs
	 */
	updateEmailNotificationQueryArgs: ( queryArgs ) => ( {
		type: 'UPDATE_EMAIL_NOTIFICATION_QUERY_ARGS',
		payload: queryArgs,
	} ),

	/**
	 * @param {number} foundItems
	 */
	updateEmailNotificationFoundItems: ( foundItems ) => ( {
		type: 'UPDATE_EMAIL_NOTIFICATION_FOUND_ITEMS',
		payload: foundItems,
	} ),

	/**
	 * @param {object} queryArgs
	 */
	fetchEmailNotifications: ( queryArgs ) => ( {
		type: 'FETCH_EMAIL_NOTIFICATIONS',
		payload: queryArgs,
	} ),

	/**
	 * @param {number} id
	 * @param {string} status
	 */
	updateEmailNotificationStatus: ( id, status ) => ( {
		type: 'UPDATE_EMAIL_NOTIFICATION_STATUS',
		payload: { id, status },
	} ),

	/**
	 * @param {number} id
	 */
	duplicateEmailNotification: ( id ) => ( {
		type: 'DUPLICATE_EMAIL_NOTIFICATION',
		payload: id,
	} ),

	/**
	 * @param {number} id
	 */
	deleteEmailNotification: ( id ) => ( {
		type: 'DELETE_EMAIL_NOTIFICATION',
		payload: id,
	} ),

	/**
	 * @param {boolean} isCreated
	 */
	updateIsCreatedEmailNotificationSingle: ( isCreated ) => ( {
		type: 'UPDATE_IS_CREATED_EMAIL_NOTIFICATION_SINGLE',
		payload: isCreated,
	} ),

	/**
	 * @param {string} key
	 * @param {boolean} value
	 */
	updateIsLoadingEmailNotificationSingle: ( key, value ) => ( {
		type: 'UPDATE_IS_LOADING_EMAIL_NOTIFICATION_SINGLE',
		payload: { key, value },
	} ),
};
