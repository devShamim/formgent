import { ConfigProvider, Radio } from 'antd';
export default function AntRadio( props ) {
	const { tokens = {}, componentTokens = {}, children, ...rest } = props;
	const defaultComponentTokens = {
		Dropdown: {
			paddingBlock: 13,
		},
	};
	const defaultTokens = {
		fontFamily: 'Inter',
	};
	return (
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
			<Radio { ...rest }>{ children }</Radio>
		</ConfigProvider>
	);
}
