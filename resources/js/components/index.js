import { registerModule } from '@formgent/modules/helpers';
import { Col, Form, Row } from 'antd';
import AntButton from './Button';
import AntCheckbox from './Checkbox';
import AntForm from './Form.js';
import AntInput from './Input';
import AntMenu from './Menu';
import AntSkeleton from './Skeleton';
import AntSpin from './Spin';
import AntSwitch from './Switch';
import AntTable from './Table';
import AntTextArea from './TextArea';

/**
 * Global components for admin and user
 */
registerModule( 'components', {
	AntButton,
	AntSwitch,
	AntInput,
	AntTextArea,
	AntForm,
	AntTable,
	AntSpin,
	AntCheckbox,
	AntSkeleton,
	Row,
	Col,
	Form,
	AntMenu,
} );

/**
 * Exporting for code editor intellisense support.
 */
export {
	AntButton,
	AntForm,
	AntInput,
	AntMenu,
	AntSwitch,
	AntTable,
	AntTextArea,
	Form,
};
