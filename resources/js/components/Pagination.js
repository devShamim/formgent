import { ConfigProvider, Pagination } from 'antd';

export default function AntPagination( props ) {
	const { tokens = {}, componentTokens = {}, ...rest } = props;
	const defaultComponentTokens = {
		Pagination: {},
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
			<Pagination { ...rest } />
		</ConfigProvider>
	);
}
