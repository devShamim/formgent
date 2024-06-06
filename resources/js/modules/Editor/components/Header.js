import { useSelect } from '@wordpress/data';
import { EditorHeaderStyle } from './style';

export default function Header( props ) {
	const { id, uiState, setUiState } = props;

	const { CommonReducer } = useSelect( ( select ) => {
		return select( 'formgent' ).getCommonState();
	}, [] );

	console.log( { CommonReducer } );

	const { NavLink } = CommonReducer.routerComponents;

	const forms = `/forms/${ id }`;

	return (
		<EditorHeaderStyle className="formgent-editor-header">
			<nav className="formgent-editor-header__nav">
				<NavLink to={ `${ forms }/edit` }>Editor</NavLink>
				<NavLink to={ `${ forms }/settings` }>Settings</NavLink>
			</nav>
		</EditorHeaderStyle>
	);
}
