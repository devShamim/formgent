import { ConfigProvider, Progress } from 'antd';

export default function AntProgress( props ) {
	const { tokens = {}, componentTokens = {}, ...rest } = props;
	const defaultComponentTokens = {
		Progress: {},
	};
	const defaultTokens = {
		lineBorderRadius: 0,
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
			<Progress { ...rest } />
		</ConfigProvider>
	);
}
