import { __ } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element';
import { useSelect, resolveSelect, useDispatch } from '@wordpress/data';
import {
	AntTable,
	AntSwitch,
	AntSkeleton,
	AntPagination,
} from '@formgent/components';

import { TableStyle } from './style';
import DataItemAction from './DataItemAction';

export default function Table( { formID } ) {
	const { state, Link } = useSelect( ( select ) => {
		const { CommonReducer, EmailNotificationReducer } =
			select( 'formgent' ).getCommonState();

		const { Link } = CommonReducer.routerComponents;

		select( 'formgent' ).getEmailNotifications( {
			form_id: formID,
		} );

		return {
			state: EmailNotificationReducer,
			Link,
		};
	}, [] );

	const {
		data,
		isLoadingData,
		isProcessing,
		queryArgs,
		foundItems,
		refresh,
	} = state;

	const { updateRefreshEmailNotifications } = useDispatch( 'formgent' );

	useEffect( () => {
		if ( ! refresh ) {
			return;
		}

		resolveSelect( 'formgent' )
			.getEmailNotifications(
				{
					form_id: formID,
					...queryArgs,
				},
				Date.now()
			)
			.then( () => {
				updateRefreshEmailNotifications( false );
			} );
	}, [ refresh, formID, queryArgs ] );

	const paginationFooterText = () => {
		if ( foundItems < 1 ) {
			return '';
		}

		const from =
			queryArgs.page * queryArgs.per_page - queryArgs.per_page + 1;
		const to = Math.min( from + queryArgs.per_page - 1, foundItems );

		return `${ from } - ${ to } of ${ foundItems } items`;
	};

	const columns = [
		{
			title: __( 'Status' ),
			dataIndex: 'status',
			render: ( status, data ) => {
				return (
					<AntSwitch
						checked={ status === 'publish' }
						onChange={ () => {
							resolveSelect(
								'formgent'
							).updateEmailNotificationStatus(
								data.id,
								'publish' === data.status ? 'draft' : 'publish',
								Date.now()
							);
						} }
						loading={ data.isUpdatingStatus }
					/>
				);
			},
		},
		{
			title: __( 'Name' ),
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: __( 'Subject' ),
			dataIndex: 'subject',
			key: 'subject',
		},
		{
			title: __( 'Action' ),
			key: 'action',
			render: ( _, data ) => {
				return (
					<DataItemAction
						{ ...data }
						formID={ formID }
						Link={ Link }
						onDuplicate={ ( id ) => {
							resolveSelect(
								'formgent'
							).duplicateEmailNotification( id, Date.now() );
						} }
						onDelete={ ( id ) => {
							resolveSelect( 'formgent' ).deleteEmailNotification(
								id
							);
						} }
					/>
				);
			},
		},
	];

	if ( ! data.length && isLoadingData ) {
		return <AntSkeleton active />;
	}

	return (
		<TableStyle>
			<AntTable
				loading={ isLoadingData || isProcessing }
				componentTokens={ {
					Table: {
						headerColor: '#6e6e6e',
						headerBg: '#d5d5d5',
						headerSplitColor: '#d5d5d5',
						cellPaddingBlock: 20,
					},
				} }
				columns={ columns }
				dataSource={ data }
				rowKey={ ( dataItem ) => dataItem.id }
				pagination={ { position: [ 'none' ] } }
			/>

			<div className="formgent-forms-pagination-wrapper">
				<span className="formgent-forms-pagination-total-count">
					{ paginationFooterText() }
				</span>

				<AntPagination
					current={ queryArgs.page }
					pageSize={ queryArgs.per_page }
					total={ foundItems }
					onChange={ ( page, per_page ) => {
						resolveSelect( 'formgent' ).getEmailNotifications(
							{
								...queryArgs,
								page,
								per_page,
							},
							Date.now()
						);
					} }
				/>
			</div>
		</TableStyle>
	);
}
