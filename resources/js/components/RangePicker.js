import { ConfigProvider, DatePicker } from 'antd';
import { DatePickerStyle } from './style';

export default function AntRangePicker( props ) {
	const { tokens = {}, componentTokens = {}, ...rest } = props;
	const defaultComponentTokens = {
		DatePicker: {
			paddingBlock: 13,
		},
	};
	const defaultTokens = {
		colorText: '#3c3c3c',
		paddingXXS: 12,
		borderRadiusLG: 10,
		borderRadiusSM: 8,
		boxShadowSecondary: '0 6px 40px rgba(144, 144, 144, 0.25)',
		controlItemBgHover: '#f5f5f5',
		controlPaddingHorizontal: 15,
		lineHeight: 1.18,
	};

	return (
		<DatePickerStyle>
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
				<DatePicker.RangePicker { ...rest } />
			</ConfigProvider>
		</DatePickerStyle>
	);
}
