import { registerModule } from '@formgent/modules/helpers';
import { Col, Form, Row } from 'antd';
import AntButton from './Button';
import AntCheckbox from './Checkbox';
import AntDrawer from './Drawer';
import AntDropdown from './Dropdown';
import AntForm from './Form.js';
import AntInput from './Input';
import AntMenu from './Menu';
import AntModal from './Modal';
import AntPagination from './Pagination';
import AntPopover from './Popover';
import AntRangePicker from './RangePicker';
import AntSelect from './Select';
import AntSkeleton from './Skeleton';
import AntSpin from './Spin';
import Loader from './Loader';
import AntSwitch from './Switch';
import AntTable from './Table';
import AntTabs from './Tabs';
import AntTextArea from './TextArea';
import AntTooltip from './Tooltip';
import AntProgress from './Progress';
import ClassicEditorField from './FormFields/ClassicEditorField';
import TextField from './FormFields/TextField';

/**
 * Global components for admin and user
 */
registerModule( 'components', {
	AntButton,
	AntSwitch,
	AntInput,
	AntTextArea,
	AntModal,
	AntDrawer,
	AntForm,
	AntTabs,
	AntTable,
	AntSpin,
	Loader,
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
	AntProgress,
	ClassicEditorField,
	TextField,
} );

/**
 * Exporting for code editor intellisense support.
 */
export {
	AntButton,
	AntDrawer,
	AntDropdown,
	AntForm,
	AntInput,
	AntMenu,
	AntModal,
	AntPagination,
	AntRangePicker,
	AntSelect,
	AntSwitch,
	AntTable,
	AntTabs,
	AntTextArea,
	Form,
	AntProgress,
	Loader,
	ClassicEditorField,
	TextField,
};
