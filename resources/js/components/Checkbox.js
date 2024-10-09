import { ConfigProvider, Checkbox } from 'antd';
export default function AntCheckbox( props ) {
	const { tokens = {}, componentTokens = {}, ...rest } = props;
	const defaultComponentTokens = {
		Checkbox: {},
	};
	const defaultTokens = {
		colorPrimary: '#6551f2',
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
			<Checkbox { ...rest } />
		</ConfigProvider>
	);
}
