import { useDispatch } from '@wordpress/data';
import ReactSVG from 'react-inlinesvg';
import emptyGif from '@image/empty.gif';
import aiIcon from '@icon/ai-icon.svg';
import templateIcon from '@icon/template-icon.svg';
import plusIcon from '@icon/plus.svg';
import { StarterContentStyle } from './style';
import { __, sprintf } from '@wordpress/i18n';

export default function StarterContent() {
	const { updateCreatePopUp, updateCreatePopupStep } =
		useDispatch( 'formgent' );

	const starterCardItem = [
		{
			type: 'default',
			icon: plusIcon,
			title: __( 'Start from scratch', 'formgent' ),
			coming_soon: false,
		},
		{
			type: 'template',
			icon: templateIcon,
			title: __( 'Use a template', 'formgent' ),
			coming_soon: false,
		},
		{
			type: 'ai',
			icon: aiIcon,
			title: __( 'Create with AI', 'formgent' ),
			coming_soon: true,
		},
	];

	const handleCardClick = ( type ) => {
		if ( type === 'default' ) {
			updateCreatePopUp( true );
			updateCreatePopupStep( '2' );
		}
	};

	return (
		<StarterContentStyle className="formgent-starter-content">
			<div className="formgent-starter-content__info">
				<img src={ emptyGif } alt="" />
				<h2>{ __( "You don't have any form", 'formgent' ) }</h2>
				<p
					dangerouslySetInnerHTML={ {
						__html: sprintf(
							__(
								'Create a new form from scratch or use a %s template to get started.',
								'formgent'
							),
							`<br />`
						),
					} }
				></p>
			</div>
			<div className="formgent-starter-cards">
				{ starterCardItem.map( ( item, index ) => {
					return (
						<div
							className={ `formgent-starter-card formgent-starter-card--${ item.type }` }
							key={ index }
							onClick={ () => handleCardClick( item.type ) }
						>
							<div className="formgent-starter-card__icon">
								<ReactSVG src={ item.icon } />
							</div>
							<h2 className="formgent-starter-card__title">
								{ item.title }
							</h2>
							{ item.coming_soon && (
								<span className="formgent-starter-card__badge">
									{ __( 'Coming soon', 'formgent' ) }
								</span>
							) }
						</div>
					);
				} ) }
			</div>
		</StarterContentStyle>
	);
}
