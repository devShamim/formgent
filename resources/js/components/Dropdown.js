import { ConfigProvider, Dropdown } from 'antd';
import { DropdownStyle } from './style';
export default function AntDropdown( props ) {
	const { tokens = {}, componentTokens = {}, children, ...rest } = props;
	const defaultComponentTokens = {
		Dropdown: {
			paddingBlock: 13,
		},
	};
	const defaultTokens = {
		colorText: '#3c3c3c',
		paddingXXS: 12,
		borderRadiusLG: 10,
		borderRadiusSM: 8,
		boxShadowSecondary: '0 6px 40px rgba(144, 144, 144, 0.25)',
		controlItemBgHover: '#f5f5f5',
		controlPaddingHorizontal: 15,
		lineHeight: 1.18,
		fontFamily: 'Inter',
	};
	return (
		<DropdownStyle>
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
				<Dropdown { ...rest }>{ children }</Dropdown>
			</ConfigProvider>
		</DropdownStyle>
	);
}
