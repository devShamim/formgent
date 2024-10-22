export const EmailNotificationSingleActions = {
	/**
	 * @param {string} key
	 * @param {boolean} value
	 */
	updateIsLoadingEmailNotificationSingle: ( key, value ) => ( {
		type: 'UPDATE_IS_LOADING_EMAIL_NOTIFICATION_SINGLE',
		payload: { key, value },
	} ),

	/**
	 * @param {number} id
	 */
	updateEmailNotificationSingleID: ( id ) => ( {
		type: 'UPDATE_EMAIL_NOTIFICATION_SINGLE_ID',
		payload: id,
	} ),

	/**
	 * @param {boolean} isNotFound
	 */
	updateIsNotFoundEmailNotificationSingle: ( isNotFound ) => ( {
		type: 'UPDATE_IS_NOT_FOUND_EMAIL_NOTIFICATION_SINGLE',
		payload: isNotFound,
	} ),

	/**
	 * @param {boolean} isCreated
	 */
	updateIsCreatedEmailNotificationSingle: ( isCreated ) => ( {
		type: 'UPDATE_IS_CREATED_EMAIL_NOTIFICATION_SINGLE',
		payload: isCreated,
	} ),

	/**
	 * @param {object} data
	 */
	updateEmailNotificationSingleInitialValues: ( data ) => ( {
		type: 'UPDATE_EMAIL_NOTIFICATION_SINGLE_INITIAL_VALUES',
		payload: data,
	} ),

	/**
	 * @param {object} presetFields
	 */
	updateEmailNotificationSinglePresetFields: ( presetFields ) => ( {
		type: 'UPDATE_EMAIL_NOTIFICATION_SINGLE_PRESET_FIELDS',
		payload: presetFields,
	} ),

	/**
	 * @param {?object} status
	 * @param {boolean} status.success
	 * @param {string} status.message
	 */
	updateEmailNotificationSingleResponseStatus: ( status ) => ( {
		type: 'UPDATE_EMAIL_NOTIFICATION_SINGLE_RESPONSE_STATUS',
		payload: status,
	} ),

	/**
	 * @param {number} id
	 */
	fetchEmailNotificationSingle: ( id ) => ( {
		type: 'FETCH_EMAIL_NOTIFICATION_SINGLE',
		payload: id,
	} ),

	/**
	 * @param {number} formID
	 */
	fetchEmailNotificationSinglePresetFields: ( formID ) => ( {
		type: 'FETCH_EMAIL_NOTIFICATION_SINGLE_PRESET_FIELDS',
		payload: formID,
	} ),

	/**
	 * @param {object} data
	 */
	createEmailNotificationSingle: ( data ) => ( {
		type: 'CREATE_EMAIL_NOTIFICATION_SINGLE',
		payload: data,
	} ),

	/**
	 * @param {object} data
	 */
	updateEmailNotificationSingle: ( id, data ) => ( {
		type: 'UPDATE_EMAIL_NOTIFICATION_SINGLE',
		payload: { id, data },
	} ),

	/**
	 * @param {boolean} refresh
	 */
	updateRefreshEmailNotifications: ( refresh ) => ( {
		type: 'UPDATE_REFRESH_EMAIL_NOTIFICATIONS',
		payload: refresh,
	} ),

	/**
	 * Reset email notification state
	 */
	resetEmailNotificationSingle: () => ( {
		type: 'RESET_EMAIL_NOTIFICATION_SINGLE',
	} ),
};
