import { AntSkeleton } from '@formgent/components';
import { lazy, Suspense } from '@wordpress/element';
import { ResultStyle, ResultWrapStyle } from './style';

const FormHeader = lazy( () => import( '@formgent/components/FormHeader' ) );
const Table = lazy( () => import( './components/Table' ) );

function ResponseTable() {
	return (
		<>
			<FormHeader resultHeader />

			<ResultWrapStyle className="formgent-result-wrap">
				<ResultStyle className="formgent-result-content">
					<Suspense fallback={ <AntSkeleton active /> }>
						<Table />
					</Suspense>
				</ResultStyle>
			</ResultWrapStyle>
		</>
	);
}

export default function ResponseTableModule( props ) {
	return <ResponseTable { ...props } />;
}
