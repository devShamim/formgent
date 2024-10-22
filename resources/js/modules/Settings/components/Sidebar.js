import { AntMenu } from '@formgent/components';
import { __ } from '@wordpress/i18n';
import { SettingsSidebarStyle } from './style';

export default function Sidebar( props ) {
	const { useNavigate, useLocation, navItems } = props;
	const navigate = useNavigate();
	const location = useLocation();

	const activeSidebarNav = location.pathname.split( '/' )[ 1 ];
	// Function to determine if a menu item should be active
	const isActive = ( path ) => {
		return activeSidebarNav === path;
	};

	// Recursive function to find the active item
	const findActiveItem = ( items ) => {
		for ( const item of items ) {
			if ( isActive( item.path ) ) {
				return item;
			} else if ( item.children ) {
				const activeChild = findActiveItem( item.children );
				if ( activeChild ) {
					return activeChild;
				}
			}
		}
		return null;
	};

	// Find the active item in the navItems
	const activeItem = findActiveItem( navItems );
	const defaultSelectedChild = activeItem?.path;
	const defaultSelectedParent = activeItem?.path?.split( '/' )[ 0 ];

	const handleMenuClick = ( e ) => {
		// Navigate to the selected route
		if ( activeSidebarNav === e.key ) return;
		navigate( e.key );
	};

	return (
		<SettingsSidebarStyle className="formgent-settings-sider">
			<AntMenu
				defaultSelectedKeys={ [ defaultSelectedChild || 'general' ] }
				defaultOpenKeys={ [ defaultSelectedParent ] }
				mode="inline"
				items={ navItems }
				onClick={ handleMenuClick }
				className="formgent-settings-sider__nav"
			/>
		</SettingsSidebarStyle>
	);
}
