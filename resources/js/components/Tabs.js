import { ConfigProvider, Tabs } from 'antd';
export default function AntTabs( props ) {
	const { componentTokens = {}, ...rest } = props;
	const defaultTokens = {
		Tabs: {
			//borderColor: 'red'
			fontFamily: 'Inter',
		},
	};

	return (
		<ConfigProvider
			theme={ {
				cssVar: true,
				token: {
					colorPrimary: '#6551f2',
				},
				components: {
					...defaultTokens,
					...componentTokens,
				},
			} }
		>
			<Tabs { ...rest } />
		</ConfigProvider>
	);
}
