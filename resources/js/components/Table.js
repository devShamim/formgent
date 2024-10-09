import { ConfigProvider, Table } from 'antd';
export default function AntTable( props ) {
	const { componentTokens = {}, ...rest } = props;
	const defaultTokens = {
		Table: {
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
			<Table { ...rest } />
		</ConfigProvider>
	);
}
