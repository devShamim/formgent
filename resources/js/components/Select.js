import { ConfigProvider, Select } from 'antd';
import { SelectStyle } from './style';
export default function AntSelect( props ) {
	const { tokens = {}, componentTokens = {}, ...rest } = props;
	const defaultComponentTokens = {
		Select: {
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
		<SelectStyle>
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
				<Select { ...rest } />
			</ConfigProvider>
		</SelectStyle>
	);
}
