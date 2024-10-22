export const WebhooksSelectors = {
	getWebhooks( WebhooksReducer ) {
		return WebhooksReducer;
	},
	getSingleHook( state, metaId ) {
		return state?.WebhooksReducer?.webhooksHub
			? state?.WebhooksReducer?.webhooksHub[ metaId ]
			: {};
	},
	getWebhooksState( WebhooksReducer ) {
		return WebhooksReducer;
	},
};
