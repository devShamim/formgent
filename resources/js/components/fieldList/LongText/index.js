import { Row, Col, Form } from 'antd';
import { AntTextArea } from '@formgent/components';
import FieldEditor from '@formgent/components/FieldEditor';
export default function LongText( props ) {
	const { field } = props;
	console.log( field );
	return (
		<div className="formgent-field">
			<div className="formgent-field__text">
				<FieldEditor />
			</div>
			<div className="formgent-field__action">
				<Row gutter={ 15 }>
					<Col>
						<Form.Item name={ field?.name }>
							<div className="formgent-field__item">
								<AntTextArea
									rows={ 4 }
									placeholder="Long text"
									maxLength={ 6 }
								/>
							</div>
						</Form.Item>
					</Col>
				</Row>
			</div>
		</div>
	);
}
