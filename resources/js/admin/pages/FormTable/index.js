// import { registerPlugin } from '@wordpress/plugins';
// import FormTableHead from '@formgent/admin/Slots/FormTableHead';
import { FormTableModule } from '@formgent/modules';

/**
 * TODO: Only for testing
 * TODO: plugin name is must be unique.
 */
// registerPlugin( 'form-table-head-test', {
// 	render: () => <FormTableHead render={ <h1>Hello</h1> } />,
// } );

export default function FormTable() {
	return <FormTableModule />;
}
