import { ConfigProvider, Modal } from 'antd';
import { InputStyle } from './style';
export default function AntModal( props ) {
	const { tokens = {}, componentTokens = {}, ...rest } = props;
	const defaultComponentTokens = {
		Modal: {},
	};
	const defaultTokens = {
		fontFamily: 'Inter',
	};
	return (
		<InputStyle>
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
				<Modal { ...rest } />
			</ConfigProvider>
		</InputStyle>
	);
}
