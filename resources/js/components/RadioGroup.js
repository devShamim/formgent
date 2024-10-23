import { ConfigProvider, Radio } from 'antd';
export default function AntRadioGroup( props ) {
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
			<Radio.Group { ...rest }>{ children }</Radio.Group>
		</ConfigProvider>
	);
}
