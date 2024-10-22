import { useState } from '@wordpress/element';
import { doAction } from '@wordpress/hooks';
import { useSelect, useDispatch, resolveSelect } from '@wordpress/data';
import patchData from '@formgent/helper/patchData';
import deleteData from '@formgent/helper/deleteData';
import ReactSVG from 'react-inlinesvg';
import { applyFilters } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';
import {
	AntSwitch,
	AntTable,
	AntSpin,
	AntTooltip,
	AntButton,
	AntPopconfirm,
} from '@formgent/components';
import { formatDate } from '@formgent/helper/utils';
import trash from '@icon/trash.svg';
import { TableStyle } from '@formgent/modules/FormTable/components/style';
import TableBulkSelection from './TableBulkSelection';

export default function Table() {
	const [ selectedRowKeys, setSelectedRowKeys ] = useState( [] );
	const { WebhooksReducer } = useSelect( ( select ) => {
		return select( 'formgent' ).getWebhooks();
	}, [] );

	const { CommonReducer } = useSelect( ( select ) => {
		return select( 'formgent' ).getCommonState();
	}, [] );

	const { useNavigate } = CommonReducer.routerComponents;

	const navigate = useNavigate && useNavigate();

	const { webhooks, pagination, isLoading, isDeleting, isStatusChanging } =
		WebhooksReducer;

	const {
		updateCurrentPage,
		deleteHookRequest,
		deleteHookSuccess,
		deleteHookError,
		changeHookStatusRequest,
		changeHookStatusSuccess,
		changeHookStatusError,
	} = useDispatch( 'formgent' );

	const rowSelection = {
		selectedRowKeys,
		onChange: handleRowSelection,
	};

	function handleRowSelection( newSelectedRowKeys ) {
		setSelectedRowKeys( newSelectedRowKeys );
	}

	async function handleUpdateStatus( status, metaId ) {
		if ( isStatusChanging ) {
			return;
		}
		changeHookStatusRequest( true );
		try {
			const updateStatusResponse = await patchData(
				`admin/webhooks/${ metaId }/status`,
				{ active: ! status }
			);

			doAction( 'formgent-toast', {
				message: updateStatusResponse.message,
			} );

			changeHookStatusSuccess( ! status, metaId );
		} catch ( error ) {
			changeHookStatusError( error );
		}
	}

	async function hadnleDeleteHook( metaId ) {
		if ( isDeleting ) {
			return;
		}
		deleteHookRequest( true );
		try {
			const deleteHookResponse = await deleteData(
				`admin/webhooks/${ metaId }`
			);

			doAction( 'formgent-toast', {
				message: deleteHookResponse.message,
			} );

			deleteHookSuccess( metaId );
		} catch ( error ) {
			deleteHookError( error );
		}
	}

	function handleWebhookTableChange( pagination ) {
		console.log( pagination );
		updateCurrentPage( pagination?.current );
		resolveSelect( 'formgent' ).getWebhooks(
			pagination?.current,
			10,
			Date.now()
		);
	}

	const dateFormatOptions = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	};

	const webhookTableColumns = applyFilters(
		'formgent_webhook_table_columns',
		[
			{
				title: 'Name',
				className: 'formgent-webhook-name',
				render: ( text, record ) => (
					<div className="formgent-webhook-title-box">
						<h4 className="formgent-webhook-title">
							{ JSON.parse( record.meta_value ).name }
						</h4>
						<AntButton
							type="gray"
							size="small"
							onClick={ () =>
								navigate( `edit/${ record.meta_id }` )
							}
						>
							{ __( 'Edit', 'formgent' ) }
						</AntButton>
					</div>
				),
			},
			{
				title: 'Webhook url',
				className: 'formgent-head-webhook-url',
				render: ( text, record ) => (
					<span>{ JSON.parse( record.meta_value ).request_url }</span>
				),
			},
			{
				title: 'Created',
				className: 'formgent-head-created-at',
				render: ( text, record ) => {
					return (
						<div className="formgent-webhook-date">
							{ formatDate(
								'en-US',
								record.created_at,
								dateFormatOptions
							) }
						</div>
					);
				},
			},
			{
				title: 'Status',
				className: 'formgent-head-status',
				render: ( text, record ) => {
					return (
						<div className="formgent-webhook-status">
							<AntSwitch
								onClick={ () =>
									handleUpdateStatus(
										JSON.parse( record.meta_value ).active,
										record.meta_id
									)
								}
								checked={
									JSON.parse( record.meta_value ).active
								}
								loading={ isStatusChanging }
							/>
							<span className="formgent-webhook-status__text">
								{ __( 'Active', 'formgent' ) }
							</span>
						</div>
					);
				},
			},
			{
				title: '',
				className: 'formgent-head-action formgent-head-action-webhook',
				render: ( text, record ) => {
					return (
						<div className="formgent-form-action-wrap">
							<AntTooltip
								title="Delete webhook"
								placement="bottomRight"
							>
								<AntPopconfirm
									placement="bottomRight"
									title={ __( 'Delete webhook', 'formgent' ) }
									description={ __(
										'Are you sure you want to delete this? This action cannot be undone.',
										'formgent'
									) }
									icon={ <ReactSVG src={ trash } /> }
									okText={ `${
										isDeleting ? 'Deleting' : 'Delete'
									}` }
									okType="danger"
									cancelText={ __( 'Cancel', 'formgent' ) }
									onConfirm={ () =>
										hadnleDeleteHook( record.meta_id )
									}
								>
									<span className="formgent-form-action formgent-form-action-webhook">
										<ReactSVG src={ trash } />
									</span>
								</AntPopconfirm>
							</AntTooltip>
						</div>
					);
				},
			},
		]
	);

	return (
		<TableStyle className="formgent-table-bordered">
			<AntSpin spinning={ isLoading }>
				{ selectedRowKeys.length !== 0 && (
					<TableBulkSelection
						data={ webhooks }
						selectedRowKeys={ selectedRowKeys }
						setSelectedRowKeys={ setSelectedRowKeys }
					/>
				) }
				<AntTable
					componentTokens={ {
						Table: {
							headerBorderRadius: 12,
							headerColor: '#4D5761',
							headerBg: '#F3F4F6',
							headerSplitColor: '#F3F4F6',
							cellFontSize: 14,
							rowHoverBg: '#fffff',
							cellPaddingBlock: 16,
						},
					} }
					showHeader={ selectedRowKeys.length === 0 }
					rowSelection={ rowSelection }
					columns={ webhookTableColumns }
					dataSource={ webhooks }
					rowKey={ ( record ) => record.meta_id }
					pagination={ {
						current: pagination?.current_page,
						pageSize: 10,
						total: pagination?.total_items,
						showTotal: ( total, range ) =>
							`${ range[ 0 ] }-${ range[ 1 ] } of ${ total } items`,
					} }
					onChange={ handleWebhookTableChange }
				/>
			</AntSpin>
		</TableStyle>
	);
}
