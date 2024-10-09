import { ConfigProvider, Switch } from 'antd';

export default function AntSwitch( props ) {
	const { tokens = {}, componentTokens = {}, ...rest } = props;
	const defaultComponentTokens = {
		Switch: {},
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
			<Switch { ...rest } />
		</ConfigProvider>
	);
}
