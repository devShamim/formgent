import { lazy, Suspense } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { AntSkeleton } from '@formgent/components';
import Header from './components/Header';
import FormTableHead from '@formgent/admin/Slots/FormTableHead';
import CreatePopup from '@formgent/components/Form/CreatePopup';
import StarterContent from './components/StarterContent';
import Filter from './components/Filter';
const Table = lazy( () => import( './components/Table' ) );

function FormTable( props ) {
	const { FormReducer } = useSelect( ( select ) => {
		return select( 'formgent' ).getForms();
	}, [] );

	const {
		forms,
		pagination,
		isLoading,
		form_edit_url,
		isFormDeleting,
		isStatusUpdating,
		singleStatusUpdated,
		sortBy,
		dateType,
		isFilterActive,
	} = FormReducer;

	return (
		<div className="formgent-page-inner">
			<FormTableHead.Slot fillProps={ { testProps: 10 } }>
				{ ( fills ) => <Header key="header" /> }
			</FormTableHead.Slot>
			<Filter
				forms={ forms }
				pagination={ pagination }
				isLoading={ isLoading }
				isFilterActive={ isFilterActive }
			/>
			{ isLoading ? (
				<AntSkeleton active />
			) : forms.length !== 0 ? (
				<Suspense fallback={ <AntSkeleton active /> }>
					<Table
						forms={ forms }
						pagination={ pagination }
						isLoading={ isLoading }
						form_edit_url={ form_edit_url }
						isFormDeleting={ isFormDeleting }
						sortBy={ sortBy }
						dateType={ dateType }
						isStatusUpdating={ isStatusUpdating }
						singleStatusUpdated={ singleStatusUpdated }
					/>
				</Suspense>
			) : forms.length === 0 && isFilterActive ? (
				<Suspense fallback={ <AntSkeleton active /> }>
					<Table
						forms={ [] }
						pagination={ pagination }
						isLoading={ isLoading }
						form_edit_url={ form_edit_url }
						isFormDeleting={ isFormDeleting }
						sortBy={ sortBy }
						dateType={ dateType }
						isStatusUpdating={ isStatusUpdating }
						singleStatusUpdated={ singleStatusUpdated }
					/>
				</Suspense>
			) : (
				<StarterContent />
			) }
			<CreatePopup />
		</div>
	);
}

export default function FormTableModule( props ) {
	return <FormTable { ...props } />;
}
