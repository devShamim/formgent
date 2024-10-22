import { AntButton } from '@formgent/components';
import { HookFormHeaderStyle } from '../style';

export default function HookFormHeader( props ) {
	const { title } = props;
	return (
		<HookFormHeaderStyle>
			<AntButton type="gray" size="small">
				Back
			</AntButton>
			<h2 className="formgent-header-title">{ title }</h2>
		</HookFormHeaderStyle>
	);
}
