/**
 *  Dependencies
 */
import { createReduxStore, register } from '@wordpress/data';
import { FormStore } from './forms';
import { SingleFormStore } from './singleform';
import { EmailNotificationStore } from './emailNotification';
import { EmailNotificationSingleStore } from './emailNotificationSingle';
import { CommonStore } from './commonData';
import { rootReducers } from './rootReducers';

/**
 * merge all actions
 */
const ACTIONS = {
	...FormStore.FormActions,
	...SingleFormStore.SingleFormActions,
	...EmailNotificationStore.EmailNotificationActions,
	...EmailNotificationSingleStore.EmailNotificationSingleActions,
	...CommonStore.CommonActions,
};

/**
 * merge all selectors
 */
const SELECTORS = {
	...FormStore.FormSelectors,
	...SingleFormStore.SingleFormSelectors,
	...EmailNotificationStore.EmailNotificationSelectors,
	...EmailNotificationSingleStore.EmailNotificationSingleSelectors,
	...CommonStore.CommonSelectors,
};

/**
 * merge all controls
 */
const CONTROLS = {
	...FormStore.FormControls,
	...SingleFormStore.SingleFormControls,
	...EmailNotificationStore.EmailNotificationControls,
	...EmailNotificationSingleStore.EmailNotificationSingleControls,
};
/**
 * merge all resolvers
 */
const RESOLVERS = {
	...FormStore.FormResolvers,
	...SingleFormStore.SingleFormResolvers,
	...EmailNotificationStore.EmailNotificationResolvers,
	...EmailNotificationSingleStore.EmailNotificationSingleResolvers,
};

/**
 * Register store
 */
register(
	createReduxStore( 'formgent', {
		actions: ACTIONS,
		reducer: rootReducers,
		selectors: SELECTORS,
		controls: CONTROLS,
		resolvers: RESOLVERS,
	} )
);
