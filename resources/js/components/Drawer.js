import { ConfigProvider, Drawer } from 'antd';
import { DrawerStyle } from './style';
export default function AntDrawer( props ) {
	const { tokens = {}, componentTokens = {}, ...rest } = props;
	const defaultComponentTokens = {
		Drawer: {},
	};
	const defaultTokens = {
		fontFamily: 'Inter',
	};
	return (
		<DrawerStyle>
			<ConfigProvider
				theme={ {
					cssVar: true,
					token: {
						...defaultTokens,
						...tokens,
					},
					components: {
						...defaultComponentTokens,
						...componentTokens,
					},
				} }
			>
				<Drawer { ...rest } />
			</ConfigProvider>
		</DrawerStyle>
	);
}
