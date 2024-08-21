import Styled from 'styled-components';

const DropdownStyle = Styled.div`

`;

const SelectStyle = Styled.div`
    width: 196px;
    .ant-select-selection-item {
        margin: 0 5px !important;
        height: 32px;
        line-height: 30px;
    }
    .ant-select-multiple .ant-select-selection-overflow {
        flex-wrap: unset;
        overflow-x: auto;
    }
`;

const InputStyle = Styled.div`
    .ant-input{
        padding: var(--ant-input-padding-block) var(--ant-input-padding-inline);
        color: var(--ant-color-text);
        line-height: var(--ant-line-height);
        border-radius: var(--ant-border-radius);
        background: var(--ant-color-bg-container);
        &.ant-input-lg{
            padding: var(--ant-input-padding-block-lg) var(--ant-input-padding-inline-lg);
        }
        &.ant-input-outlined{
            border-color: var(--ant-color-border);
            border-width: var(--ant-line-width);
            &:focus{
                outline: 0;
                border-color: var(--formgent-color-dark);
                box-shadow: 0 0;
            }
        }
    }
`;

const DatePickerStyle = Styled.div`

`;

const TagStyle = Styled.div`

`;

const ButtonStyle = Styled.div`
    .ant-btn-dark{
        color: var(--formgent-color-white);
        background-color: var(--formgent-color-dark);
    }
    .ant-btn-white{
        background-color: var(--formgent-color-white);
    }
`;

const ModalAlertStyle = Styled.div`
    padding: 84px 0 0;
    .formgent-modal-action{
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        padding: 20px 30px;
        background-color: var(--formgent-color-bg-light);
        .formgent-btn{
            margin: 0 5px;
        }
        &.formgent-modal-filter-action{
            .formgent-modal-action__cancel{
                background: transparent;
                border: 0 none;
                padding: 0;
                color: var(--formgent-color-light-gray);
                &:hover{
                    color: var(--formgent-color-dark);
                }
            }
        }
        &.formgent-delete-alert-modal-action,
        &.formgent-conversation-delete-action,
        &.formgent-form-delete-alert-action,
        &.formgent-response-delete-alert-action,
        &.formgent-delete-tag-alert-action{
            justify-content: flex-end;
            .formgent-btn{
                border-radius: 10px;
                min-height: 40px;
            }
        }
    }

    //filter modal
    .formgent-modal-filter-inner{
        padding: 0 30px 30px;
        .formgent-modal-filter__tags-label{
            font-size: 16px;
            font-weight: 600;
            color: var(--formgent-color-dark);
            margin-bottom: 20px;
            display: block;
        }
        .formgent-modal-filter__tags-list{
            margin: 0;
            padding: 0;
            list-style: none;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            max-height: 170px;
            overflow-y: auto;
            overflow-x: hidden;
        }
        .formgent-modal-filter__tags-item{
            flex: 0 0 50%;
            margin-bottom: 18px;
            .formgent-checkbox{
                display: flex;
                gap: 12px;
                label{
                    font-size: 14px;
                    font-weight: 500;
                    color: var(--formgent-color-gray);
                    svg{
                        inset-inline-start: -25px;
                    }
                }
            }
        }
        .formgent-show-more{
            display: block;
            font-size: 14px;
            font-weight: 500;
            color: var(--formgent-color-dark);
            margin-top: 0;
            text-decoration: underline;
            cursor: pointer;
            &--active{
                margin-top: 18px;
            }
        }
    }
    .formgent-modal-action{
        .formgent-modal-cancel-btn{
            border: 1px solid var(--formgent-color-gray-300);
            color: var(--formgent-color-gray-600);
        }
    }

    .formgent-session-expired__content{
        margin-top: -84px;
        display: flex;
        align-items: center;
        flex-direction: column;
        padding: 50px;
        h2{
            margin: 30px 0 20px;
            font-size: 24px;
            font-weight: 500;
            color: var(--formgent-color-dark);
        }
        p{
            margin: 0 0 50px;
        }
    }
`;

const EmptyStyle = Styled.div`
    &.formgent-empty-box{
        text-align: center;
    }
    .formgent-empty-box__icon{
        margin-bottom: 20px;
        svg{
            width: 60px;
            height : 60px;
        }
    }
    .formgent-empty-box__label{
        font-size: 20px;
        color: var(--formgent-color-dark);
    }
    .formgent-empty-box__text{
        font-size: 18px;
        margin-top: 20px;
    }
    span{
        display: block;
    }
`;

const AlertContentStyle = Styled.div`
    padding: 0 30px 25px;
    .formgent-delete-alert-text{
        p{
            font-size: 14px;
            color: var(--formgent-color-gray);
            margin: 0 0 27px;
        }
    }
`;

const FormHeaderStyle = Styled.div`
    display: flex;
    gap: 50px;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px 0 0;
    border-bottom: 12px solid var(--formgent-color-bg-sec);
    background-color: var(--formgent-color-white);
    position: sticky;
    top: 32px;
    z-index: 9999;
    .formgent-editor-header__info {
        flex: 1;
        display: flex;
        gap: 15px;
        align-items: center;
        svg {
            width: 14px;
            height: 14px;
            path {
                fill: var(--formgent-font-color);
                transition: fill ease .3s;
            }
        }
        .formgent-editor-header__info__redirect {
            display: flex;
            align-items: center;
            border-right: 1px solid var(--formgent-color-border-light);
            button {
                display: flex;
                align-items: center;
                gap: 6px;
                height: 54px;
                padding: 0 15px;
                font-size: 13px;
                font-weight: 500;
                color: var(--formgent-color-dark);
                background-color: transparent;
                border: none;
                cursor: pointer;
                transition: color ease .3s;
                svg path {
                    fill: var(--formgent-color-dark);
                    transition: fill ease .3s;
                }
                &:hover {
                    color: var(--formgent-color-primary);
                    svg path {
                        fill: var(--formgent-color-primary);
                    }
                }
            }
        }

        .formgent-editor-header__info__logo {
            width: 70px;
            height: 60px;
            display: flex;
            gap: 6px;
            align-items: center;
            justify-content: center;
            background-color: var(--formgent-color-bg-deep);
            svg {
                width: 40px;
                height: 40px;
            }
        }

        .formgent-editor-header__info__wrap {
            display: flex;
            align-items: center;
            gap: 20px;
        }

        .formgent-editor-header__info__title {
            display: flex;
            gap: 6px;
            align-items: center;
            padding: 0;
            font-size: 13px;
            font-weight: 500;
            color: var(--formgent-color-dark);
            svg {
                &:hover {
                    cursor: pointer;
                    path {
                        fill: var(--formgent-color-primary);
                    }
                }
            }
            input {
                border-color: var(--formgent-color-border);
                box-shadow: none;
                outline: none;
                &:hover,
                &:focus {
                    border-color: var(--formgent-color-primary);
                }
            }
            span {
                font-size: 12px;
                font-weight: 600;
                color: var(--formgent-color-dark);
            }
        }
        .formgent-editor-header__info__status {
            display: flex;
            align-items: center;
            flex: 0 0 auto;
            gap: 6px;
            opacity: .6;
            font-size: 12px;
            font-weight: 400;
        }
    }
    .formgent-editor-header__nav {
        display: flex;
        gap: 15px;
        justify-content: center;
        a {
            display: flex;
            gap: 8px;
            align-items: center;
            font-size: 14px;
            font-weight: 600;
            height: 36px;
            padding: 0 16px;
            border-radius: 8px;
            color: var(--formgent-font-color);
            text-decoration: none;
            transition: all ease .3s;
            &.active,
            &:hover {
                color: var(--formgent-color-primary);
                background-color: var(--formgent-primary-light-button-bg);
                box-shadow: none;
            }
        }
    }

    .formgent-editor-header__actions {
        display: flex;
        gap: 15px;
        flex: 1;
        align-items: center;
        justify-content: flex-end;
        button {
            height: 38px;
            font-size: 14px;
            font-weight: 600;
            padding: 0;
            border: none;
            background: transparent;
            color: var(--formgent-font-color);
            text-decoration: none;
            cursor: pointer;
            svg {
                width: 16px;
                height: 16px;
                path {
                    fill: var(--formgent-font-color);
                }
            }
            &:hover {
                color: var(--formgent-color-primary);
                svg {
                    path {
                        fill: var(--formgent-color-primary);
                    }
                }
            }
        }
        .formgent-editor-header__actions__button {
            font-size: 14px;
            font-weight: 600;
            padding: 10px 15px;
            border-radius: 8px;
            color: var(--formgent-color-dark);
            background-color: var(--formgent-color-bg-light);
            text-decoration: none;
            transition: all ease .3s;
            &.active,
            &:hover {
                color: var(--formgent-color-primary);
                background-color: var(--formgent-primary-light-button-bg);
            }
        }
        .formgent-editor-header__actions__modify {
            display: flex;
            gap: 10px;
        }
        .formgent-editor-header__actions__status {
            display: flex;
            gap: 10px;
        }
        .formgent-editor-header__actions__dropdown {
            position: relative;
            .formgent-dropdown__button {
                font-size: 18px;
            }
        }
    }
`;

const MenuStyle = Styled.div`

`;

const SubmissionFormStyle = Styled.div`

`;

export {
	AlertContentStyle,
	ButtonStyle,
	DropdownStyle,
	EmptyStyle,
	FormHeaderStyle,
	InputStyle,
	MenuStyle,
	ModalAlertStyle,
	SelectStyle,
	SubmissionFormStyle,
	DatePickerStyle,
	TagStyle,
};
