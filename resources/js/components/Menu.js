import { ConfigProvider, Menu } from 'antd';
import { MenuStyle } from './style';

export default function AntMenu( props ) {
	const { tokens = {}, componentTokens = {}, ...rest } = props;
	const defaultComponentTokens = {
		Input: {
			paddingBlock: 10,
			paddingBlockLG: 12,
			paddingInlineLG: 20,
			activeBorderColor: '#000000',
		},
	};
	const defaultTokens = {
		colorBgContainer: '#efefef',
		colorBorder: 'transparent',
		borderRadius: 12,
		lineWidth: 2,
		fontFamily: 'Inter',
	};

	return (
		<MenuStyle>
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
				<Menu { ...rest } />
			</ConfigProvider>
		</MenuStyle>
	);
}
