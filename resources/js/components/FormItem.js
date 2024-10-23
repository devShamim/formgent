import { ConfigProvider, Form } from 'antd';
export default function AntFormItem( props ) {
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
			<Form.Item { ...rest }>{ children }</Form.Item>
		</ConfigProvider>
	);
}
