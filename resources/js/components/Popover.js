import { ConfigProvider, Popover } from 'antd';
import { InputStyle } from './style';
export default function AntPopover( props ) {
	const { tokens = {}, componentTokens = {}, ...rest } = props;
	const defaultComponentTokens = {
		Popover: {},
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
				<Popover { ...rest } />
			</ConfigProvider>
		</InputStyle>
	);
}
