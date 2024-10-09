import { lazy, useState, useEffect } from '@wordpress/element';
import { useSelect, useDispatch, resolveSelect } from '@wordpress/data';
import { SummaryStyle } from './style';
import { __ } from '@wordpress/i18n';
import FieldContent from './components/FieldContent';
const FormHeader = lazy( () => import( '@formgent/components/FormHeader' ) );

function Summary() {
	const { CommonReducer } = useSelect( ( select ) => {
		return select( 'formgent' ).getCommonState();
	}, [] );
	const { useParams } = CommonReducer?.routerComponents;
	const { id: formId } = useParams();

	const { updateSummaryPerPage } = useDispatch( 'formgent' );

	// Retrieve all summary fields for the form ID
	const summaryFields = useSelect(
		( select ) => {
			return select( 'formgent' ).getSummaryFields( formId ) || [];
		},
		[ formId ]
	);

	const availableFields = summaryFields.length
		? summaryFields.map( ( item ) => item.field_name )
		: [];

	const summaries = useSelect(
		( select ) => {
			const getSummarySelector = select( 'formgent' ).getSummary;
			return availableFields.reduce( ( acc, field ) => {
				acc = getSummarySelector( formId, field ) || [];
				return acc;
			}, {} );
		},
		[ availableFields, formId ]
	);

	//handle infinite load on scroll
	let [ itemsPerPage, setItemsPerPage ] = useState( 10 );
	let [ isFetching, setIsFetching ] = useState( false );
	let [ currentField, setCurrentField ] = useState( null );

	useEffect( () => {
		if ( isFetching ) {
			resolveSelect( 'formgent' )
				.getSummary( formId, currentField, itemsPerPage )
				.then( () => {
					setIsFetching( false );
				} )
				.catch( ( err ) => {
					console.log( err );
					setIsFetching( false );
				} );
		}
	}, [ isFetching, currentField, itemsPerPage ] );

	function handleInfiniteScroll( e, fieldName ) {
		if (
			e.target.scrollHeight - e.target.scrollTop <=
				e.target.clientHeight + 5 &&
			! isFetching
		) {
			if ( currentField !== fieldName ) {
				setItemsPerPage( 10 );
			}
			setCurrentField( fieldName );
			setItemsPerPage( ( prevItemsPerPage ) => prevItemsPerPage + 10 );
			setIsFetching( true );
		}
	}

	return (
		<>
			<FormHeader resultHeader />
			<SummaryStyle>
				<div className="formgent-summary-content">
					{ summaryFields.length ? (
						<FieldContent
							summaryFields={ summaryFields }
							summaries={ summaries }
							handleOnScroll={ handleInfiniteScroll }
						/>
					) : (
						<div>No data found!</div>
					) }
				</div>
			</SummaryStyle>
		</>
	);
}

export default function SummaryModule( props ) {
	return <Summary { ...props } />;
}
