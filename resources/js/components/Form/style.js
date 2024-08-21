import Styled from 'styled-components';

const CreatePopupStyle = Styled.div`
    width: fit-content;
    margin: 0 auto;
    display: flex;
    align-items: center;
    flex-direction: column;
    @media only screen and (max-width: 575px){
        width: 100%;
    }
    .formgent-createPopup{
        text-align: center;
        margin: 50px 0;
        .formgent-toggle-inline{
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            .formgent-toggle__label{
                display: flex;
                align-items: center;
                font-size: 15px;
                font-weight: 500;
                color: var(--formgent-color-dark);
                cursor: pointer;
            }
        }
    }

    .formgent-select__option{
        display: flex;
        .formgent-checkbox{
            margin-right: 10px;
        }
    }

    .formgent-createPopup__header{
        margin-top: 56px;
        display: flex;
        align-items: center;
        flex-direction: column;
        h4{
            font-size: 26px;
            font-weight: 600;
            margin: 0 0 8px;
            line-height: 1.27;
            color: var(--formgent-color-dark);
        }
        p{
            font-size: 16px;
            font-weight: 400;
            margin: 0;
        }
        .formgent-createPopup__header-step{
            display: block;
            margin-bottom: 12px;
        }
    }

    .formgent-createPopup__actions{
        display: flex;
        align-items: center;
        margin-top: 32px;
        @media only screen and (max-width: 400px){
            flex-wrap: wrap;
        }
    }

    .formgent-createPopup__form-type{
        margin: 25px 0 5px;
        .ant-radio-group {
            background: #fff;
            padding: 6px;
            border-radius: 10px;
        }
        .ant-radio-button-wrapper {
            border: 0 none;
            border-radius: 8px;
            height: 36px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            &:before{
                content: none;
            }
            &.ant-radio-button-wrapper-checked{
                background: var(--formgent-color-primary-100);
                .formgent-createPopup__form-type__btn{
                    color: var(--formgent-color-primary);
                }
            }
        }
    }
    .formgent-createPopup__form-type__btn{
        border-radius: 6px;
        display: flex;
        align-items: center;
        gap: 8px;
        color: var(--formgent-color-gray-500);
        font-size: 14px;
        font-weight: 600;
    }

    .formgent-createPopup__action{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 15px;
        border-radius: 20px;
        padding: 30px;
        text-decoration: none;
        cursor: pointer;
        max-width: 260px;
        text-align: center;
        background-color: var(--formgent-color-gray-50);
        transition: var(--formgent-transition);
        border: 4px solid #FFF;
        box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
        &:hover{
            background-color: #fff;
        }
        @media only screen and (max-width: 480px){
            width: 50%;
            padding: 20px 0;
        }
        @media only screen and (max-width: 400px){
            width: 100%;
        }
    }
    .formgent-createPopup__action-icon{
        padding: 48px 54px;
        background: var(--formgent-color-gray-100);
        border-radius: 20px;
    }
    .formgent-createPopup__action-icon-wrap{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 88px;
        height: 88px;
        border-radius: 20px;
        background-color: var(--formgent-color-white);
        svg{
            fill: var(--formgent-color-primary);
        }
    }

    .formgent-createPopup__action-label{
        display: block;
        font-size: 19px;
        font-weight: 600;
        margin: 20px 0 6px 0;
        line-height: 1.38;
        color: var(--formgent-color-dark);
    }
    .formgent-createPopup__action-text{
        font-size: 14px;
        font-weight: 400;
        color: var(--formgent-color-gray-500);
    }

    .formgent-validate-danger{
        display: block;
    }

    .formgent-form-group{
        flex-direction: column;
        &__element{
            font-size: 16px;
            min-height: 50px;
            padding-inline-start: 20px;
            padding-inline-end: 20px;
            border-radius: 12px;
        }
    }

    .formgent-btn {
        min-height: 50px;
    }
`;

const CreateFormStyle = Styled.div`
    text-align: center;
    padding: 60px 80px;
    background: var(--formgent-color-gray-100);
    .formgent-create-modal-title{
        font-size: 26px;
        font-weight: 600;
        margin: 0 0 16px 0;
    }
    .formgent-create-modal-subtitle{
        font-size: 14px;
        font-weight: 400;
        margin: 0 0 24px;
        color: var(--formgent-color-gray-600);
    }
    .formgent-create-modal__content {
        .ant-form-item-required {
            font-size: 15px;
            font-weight: 600;
            color: var(--formgent-color-dark);
        }
        .ant-form-item-explain-error {
            text-align: left;
            padding: 10px 0 20px;
        }
        .ant-input {
            border-radius: 10px;
            background: #FFF;
            box-shadow: 0px 1px 3px 0px rgba(16, 24, 40, 0.10), 0px 1px 2px 0px rgba(16, 24, 40, 0.06);
            padding: 10px 17px !important;
        }
        .ant-btn{
            font-size: 16px;
            font-weight: 600;
            border-radius: 10px;
            box-shadow: 0px 4px 4px 0px rgba(36, 20, 116, 0.10);
            padding: 23px 15px !important;
        }
    }
`;

const ElementPreparationStyle = Styled.div`
    width: 100%;
    min-width: 320px;
    .formgent-import-attachment__title{
        font-size: 18px;
        color: var(--formgent-color-dark);
    }
    .formgent-import-attachment__progress{
        display: flex;
        align-items: center;
    }
    .formgent-import-attachment__percentage{
        margin-left: 15px;
    }
`;

const CreateFormStyleWrap = Styled.div`
    text-align: start;
    margin-top: 50px;
    .formgent-form-group{
        width: 450px;
        @media only screen and (max-width: 575px){
            width: 100%;
        }
    }
    .formgent-btn-block{
        margin-top: 30px;
    }
    .formgent-tooltip-toggle{
        position: relative;
        top: 1px;
        display: inline-block;
        margin-inline-start: 10px;
        line-height: .85;
        cursor: pointer;
    }
    .formgent-form__element,
    .formgent-form__element-inline{
        border-radius: 12px;
        background-color: var(--formgent-color-bg-light);
    }
    .formgent-form__element{
        &::placeholder{
            color: #3C3C3C;
        }
    }
    .formgent-form__element-inline{
        display: flex;
        justify-content: space-between;
        padding: 15px 20px;
    }
    .formgent-form__label{
        display: flex;
        align-items: center;
        font-size: 15px;
        font-weight: 600;
        color: var(--formgent-color-dark);
    }
    .formgent-select {
        margin-top: 12px;
        &__control{
            background-color: var(--formgent-color-bg-light);
        }
    }
`;

export {
	CreatePopupStyle,
	CreateFormStyle,
	ElementPreparationStyle,
	CreateFormStyleWrap,
};
