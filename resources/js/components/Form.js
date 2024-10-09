import { ConfigProvider, Form } from 'antd';
export default function AntForm( props ) {
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
			<Form { ...rest }>{ children }</Form>
		</ConfigProvider>
	);
}
