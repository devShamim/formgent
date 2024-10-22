import { WebhooksActions } from './actions';
export const WebhooksResolvers = {
	*getWebhooks( currentPage = '1', perPage = '10', timestamp = 0 ) {
		yield WebhooksActions.fetchWebhookRequest( true );
		try {
			const data = yield WebhooksActions.fetchWebhook(
				'formgent/admin/webhooks',
				currentPage,
				perPage
			);
			yield WebhooksActions.fetchWebhookSuccess( {
				webhooks: data.items,
				pagination: data.pagination,
			} );
			yield WebhooksActions.fetchWebhookRequest( false );
		} catch ( error ) {
			yield WebhooksActions.fetchWebhookError( error );
			yield WebhooksActions.fetchWebhookRequest( false );
		}
	},
	*getSingleHook( metaId, timeStamp ) {
		console.log( metaId );
		yield WebhooksActions.fetchSingleWebhookRequest( true );
		try {
			let singleHook = {};
			if ( metaId ) {
				const data = yield WebhooksActions.fetchSingleWebhook(
					`formgent/admin/webhooks/${ metaId }`
				);
				singleHook = structuredClone( data?.item );
				yield WebhooksActions.fetchSingleWebhookSuccess(
					singleHook,
					metaId
				);
			}

			yield SingleFormActions.fetchSingleWebhookRequest( false );
			return singleForm;
		} catch ( error ) {
			yield SingleFormActions.fetchSingleWebhookError( error );
			yield SingleFormActions.fetchSingleWebhookRequest( false );
		}
	},
};
