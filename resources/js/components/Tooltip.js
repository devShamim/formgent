import { ConfigProvider, Tooltip } from 'antd';

export default function AntTooltip( props ) {
	const { tokens = {}, componentTokens = {}, ...rest } = props;
	const defaultComponentTokens = {
		Tooltip: {},
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
			<Tooltip { ...rest } />
		</ConfigProvider>
	);
}
