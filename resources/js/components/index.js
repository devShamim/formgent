import { registerModule } from '@formgent/modules/helpers';
import { Col, Form, Row } from 'antd';
import AntButton from './Button';
import AntCheckbox from './Checkbox';
import AntDropdown from './Dropdown';
import AntForm from './Form.js';
import AntInput from './Input';
import AntMenu from './Menu';
import AntModal from './Modal';
import AntPopover from './Popover';
import AntSelect from './Select';
import AntSkeleton from './Skeleton';
import AntSpin from './Spin';
import AntSwitch from './Switch';
import AntTable from './Table';
import AntTabs from './Tabs';
import AntTextArea from './TextArea';
import AntTooltip from './Tooltip';
import AntRangePicker from './RangePicker';
import AntPagination from './Pagination';

/**
 * Global components for admin and user
 */
registerModule( 'components', {
	AntButton,
	AntSwitch,
	AntInput,
	AntTextArea,
	AntModal,
	AntForm,
	AntTabs,
	AntTable,
	AntSpin,
	AntCheckbox,
	AntSkeleton,
	AntTooltip,
	AntPopover,
	Row,
	Col,
	Form,
	AntMenu,
	AntDropdown,
	AntSelect,
	AntRangePicker,
	AntPagination,
} );

/**
 * Exporting for code editor intellisense support.
 */
export {
	AntButton,
	AntDropdown,
	AntForm,
	AntInput,
	AntMenu,
	AntModal,
	AntSelect,
	AntSwitch,
	AntTable,
	AntTabs,
	AntTextArea,
	Form,
	AntRangePicker,
	AntPagination,
};
