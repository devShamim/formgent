import { ConfigProvider, Tag } from 'antd';
import { TagStyle } from './style';
export default function AntTag( props ) {
	const { tokens = {}, componentTokens = {}, ...rest } = props;
	const defaultComponentTokens = {
		Tag: {
			paddingBlock: 10,
			paddingBlockLG: 12,
			paddingInlineLG: 20,
			activeBorderColor: '#000000',
		},
	};
	const defaultTokens = {
		colorBgContainer: '#efefef',
		colorBorder: 'transparent',
		borderRadius: 12,
		lineWidth: 2,
	};
	return (
		<TagStyle>
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
				<Tag { ...rest } />
			</ConfigProvider>
		</TagStyle>
	);
}
