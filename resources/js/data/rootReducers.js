import { combineReducers } from '@wordpress/data';
import { FormReducer } from './forms/reducers';
import { SingleFormReducer } from './singleform/reducers';
import { EmailNotificationReducer } from './emailNotification/reducers';
import { EmailNotificationSingleReducer } from './emailNotificationSingle/reducers';
import { CommonReducer } from './commonData/reducers';
export const rootReducers = combineReducers( {
	FormReducer,
	SingleFormReducer,
	EmailNotificationReducer,
	EmailNotificationSingleReducer,
	CommonReducer,
} );
