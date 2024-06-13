import { AntInput } from '@formgent/components';
import { registerFields } from '@formgent/fields';
import leftIndent from '@icon/collapse-left.svg';
import rightIndent from '@icon/collapse-right.svg';
import search from '@icon/search.svg';
import { useEffect, useRef, useState } from '@wordpress/element';
import { Col, Row } from 'antd';
import ReactSVG from 'react-inlinesvg';
import DraggableField from './DraggableField';
import SidebarCollapse from './SidebarCollapse';
import { InserterStyle } from './style';

export default function FieldInserter( props ) {
	const { inserterDomKey } = props;
	const [ activeTab, setActiveTab ] = useState( 'element' );
	const mainFields = registerFields().filter(
		( item ) => item.type !== 'spacer'
	);
	const [ fields, setFields ] = useState( mainFields );
	const [ searchQuery, setSearchQuery ] = useState( '' );

	const contentRef = useRef( null );

	function getFieldByGroup( groupName, field ) {
		if (
			! ( field.group === groupName ) ||
			field.fieldObj.group === 'submit'
		) {
			return;
		}

		return (
			<Col span={ 8 }>
				<DraggableField
					key={ field?.fieldObj?.id }
					field={ field?.fieldObj }
					fieldInfo={ { title: field?.title, icon: field?.icon } }
				/>
			</Col>
		);
	}

	//Search fields
	useEffect( () => {
		if ( searchQuery.trim() === '' ) {
			setFields( mainFields );
		} else {
			const filteredScreenTypes = mainFields.filter( ( field ) =>
				field.title.toLowerCase().includes( searchQuery.toLowerCase() )
			);
			setFields( filteredScreenTypes );
		}
	}, [ searchQuery ] );

	//update search query
	function handleUpdateSearchQuery( e ) {
		setSearchQuery( e.target.value );
	}

	return (
		<InserterStyle
			key={ inserterDomKey }
			className="formgent-editor-inserter"
			ref={ contentRef }
		>
			<div className="formgent-editor-sider">
				<div className="formgent-editor-sider__top">
					<ul className="formgent-editor-sider__nav">
						<li>
							<a
								href="#"
								className={
									activeTab === 'element'
										? 'formgent-active'
										: ''
								}
								onClick={ ( e ) => {
									e.preventDefault();
									setActiveTab( 'element' );
								} }
							>
								Elements
							</a>
						</li>
						<li>
							<a
								href="#"
								className={
									activeTab === 'design'
										? 'formgent-active'
										: ''
								}
								onClick={ ( e ) => {
									e.preventDefault();
									setActiveTab( 'design' );
								} }
							>
								Design
							</a>
						</li>
					</ul>
				</div>
				<div className="formgent-editor-sider__content">
					<div className="formgent-editor-sider__field-search">
						<AntInput
							prefix={ <ReactSVG src={ search } /> }
							onChange={ handleUpdateSearchQuery }
						/>
					</div>
					<span className="formgent-editor-inserter__label">
						General
					</span>
					<div className="formgent-editor-inserter__group">
						<Row gutter={ 15 }>
							{ fields.map( ( field ) =>
								getFieldByGroup( 'basic', field )
							) }
						</Row>
					</div>
				</div>
			</div>
			<SidebarCollapse
				initIcon={ leftIndent }
				collapseIcon={ rightIndent }
				contentRef={ contentRef }
			/>
		</InserterStyle>
	);
}
