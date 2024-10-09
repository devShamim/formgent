import { ConfigProvider, Input } from 'antd';
import { InputStyle } from './style';
export default function AntInput( props ) {
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
		<InputStyle>
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
				<Input { ...rest } />
			</ConfigProvider>
		</InputStyle>
	);
}
