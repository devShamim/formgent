import { AntInput, AntSelect, Row, Col } from '@formgent/components';
import { Form } from 'antd';
import { HookFormStyle } from '../style';
export default function HookForm() {
	const requestMethodOption = [
		{ value: 'post', label: 'POST' },
		{ value: 'get', label: 'GET' },
		{ value: 'put', label: 'PUT' },
		{ value: 'patch', label: 'PATCH' },
		{ value: 'delete', label: 'DELETE' },
	];
	const requestFormat = [
		{ value: 'form', label: 'Form' },
		{ value: 'json', label: 'JSON' },
		{ value: 'html', label: 'HTML' },
	];

	return (
		<HookFormStyle>
			<Form name="formgent-create-hook-form" layout="vertical">
				<Row gutter={ 20 }>
					<Col xl={ 12 }>
						<div className="formgent-form-group">
							<Form.Item
								label="Webhook Name"
								name="name"
								reles={ [
									{
										required: true,
										message: 'Field is required',
									},
								] }
							>
								<AntInput className="formgent-form-field" />
								<span className="formgent-form-sublabel">
									This is a hint text to help user.
								</span>
							</Form.Item>
						</div>
					</Col>
					<Col sm={ 12 }>
						<div className="formgent-form-group">
							<Form.Item
								label="Request URL"
								name="request_url"
								reles={ [
									{
										required: true,
										message: 'Field is required',
									},
								] }
							>
								<AntInput className="formgent-form-field" />
								<span className="formgent-form-sublabel">
									This is a hint text to help user.
								</span>
							</Form.Item>
						</div>
					</Col>
				</Row>
				<Row gutter={ 20 }>
					<Col sm={ 12 }>
						<div className="formgent-form-group">
							<Form.Item
								label="Request Method"
								name="request_method"
								reles={ [
									{
										required: true,
										message: 'Field is required',
									},
								] }
							>
								<AntSelect
									defaultValue="get"
									options={ requestMethodOption }
								/>
								<span className="formgent-form-sublabel">
									This is a hint text to help user.
								</span>
							</Form.Item>
						</div>
					</Col>
					<Col sm={ 12 }>
						<div className="formgent-form-group">
							<Form.Item
								label="Request Format"
								name="request_format"
								reles={ [
									{
										required: true,
										message: 'Field is required',
									},
								] }
							>
								<AntSelect
									defaultValue="form"
									options={ requestFormat }
								/>
								<span className="formgent-form-sublabel">
									This is a hint text to help user.
								</span>
							</Form.Item>
						</div>
					</Col>
				</Row>
			</Form>
		</HookFormStyle>
	);
}
