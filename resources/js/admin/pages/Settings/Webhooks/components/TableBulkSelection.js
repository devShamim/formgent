import { doAction } from '@wordpress/hooks';
import { useDispatch } from '@wordpress/data';
import { addQueryArgs } from '@wordpress/url';
import { AntCheckbox, AntButton } from '@formgent/components';
import { TableBlkSelectionStyle } from '../style';
import ReactSVG from 'react-inlinesvg';
import trashIcon from '@icon/trash.svg';
import deleteData from '@formgent/helper/deleteData';
export default function TableBulkSelection( props ) {
	const { data, selectedRowKeys, setSelectedRowKeys } = props;

	const {
		deleteBulkHookRequest,
		deleteBulkHookSuccess,
		deleteBulkHookError,
	} = useDispatch( 'formgent' );

	function handleBulkSelection( event ) {
		if ( event.target.checked ) {
			setSelectedRowKeys( data.map( ( item ) => item.id ) );
		} else {
			setSelectedRowKeys( [] );
		}
	}

	function handleClearSelection() {
		setSelectedRowKeys( [] );
	}

	async function handleBulkDelete() {
		deleteBulkHookRequest();
		try {
			const bulkDeleteResponse = await deleteData(
				addQueryArgs( `admin/webhooks`, {
					ids: selectedRowKeys,
				} )
			);
			doAction( 'formgent-toast', {
				message: bulkDeleteResponse.message,
			} );
			deleteBulkHookSuccess( selectedRowKeys );
			setSelectedRowKeys( [] );
		} catch ( error ) {
			deleteBulkHookError( error );
		}
	}

	return (
		<TableBlkSelectionStyle className="formgent-bulk-selection">
			<div className="formgent-bulk-selection__checkbox">
				<AntCheckbox
					onChange={ handleBulkSelection }
					checked={ selectedRowKeys.length === data.length }
				></AntCheckbox>
			</div>
			<AntButton
				// type="white"
				size="small"
				className="formgent-btn-bulk-delete"
				onClick={ handleBulkDelete }
			>
				<ReactSVG src={ trashIcon } />
				Delete selected { '(' + selectedRowKeys.length + ')' }
			</AntButton>
			<a className="formgent-clear-bulk" onClick={ handleClearSelection }>
				Clear Selection
			</a>
		</TableBlkSelectionStyle>
	);
}
