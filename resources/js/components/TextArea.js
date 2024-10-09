import { ConfigProvider, Input } from 'antd';
import { InputStyle } from './style';
export default function AntTextArea( props ) {
	const { tokens = {}, componentTokens = {}, ...rest } = props;
	const { TextArea } = Input;
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
				<TextArea { ...rest } />
			</ConfigProvider>
		</InputStyle>
	);
}
