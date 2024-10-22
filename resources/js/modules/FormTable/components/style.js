import Styled from 'styled-components';

const TitleBoxStyle = Styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    .formgent-titleBox__editor{
        display: flex;
        align-items: center;
        gap: 20px;
        input{
            border-top: 0px none;
            border-inline-end: 0px none;
            border-bottom: 1px solid #ededed;
            border-inline-start: 0px none;
            border-image: initial;
            background-color: transparent;
            border-radius: 0px;
            padding: 4px 0;
            line-height: 2;
            min-height: 30px;
            color: #2c3338;
            transition: var(--formgent-transition);
            &:active,
            &:focus{
                border: 0 none;
                border-bottom: 1px solid var(--formgent-color-dark);
                outline: 0;
                box-shadow: none;
            }
        }
        span{
            font-size: 13px;
            color: var(--formgent-color-danger);
            display: block;
            margin-top: 10px;
        }
    }
    .formgent-titleBox__actions{
        display: flex;
        align-items: center;
        gap: 5px;
    }

    span.formgent-titleBox-action-item{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        cursor: pointer ;
        border-radius: 50%;
        transition: var(--formgent-transition);
        &.formgent-titleBox__actions-yes{
            background-color: var(--formgent-color-success);
            border: 1px solid var(--formgent-color-success);
        }
        &.formgent-titleBox__actions-cancel{
            background-color: var(--formgent-color-danger);
            border: 1px solid var(--formgent-color-danger);
        }
        svg{
            width: 10px;
            height: 10px;
            path{
                fill: #fff;
                transition: var(--formgent-transition);
            }
        }
        .formgent-circle-loader {
            border-color: #fff;
            border-bottom-color: transparent;
            transition: var(--formgent-transition);
        }
        &:hover{
            background: none;
            svg{
                path{
                    fill: var(--formgent-color-dark);
                }
            }
            .formgent-circle-loader {
                border-color: var(--formgent-primary-color);
                border-bottom-color: transparent;
            }
        }
    }
    .formgent-titlebox__content{
        display: flex;
        align-items: center;
        gap: 12px;
        .formgent-titleBox-icon{
            line-height: 0;
        }
    }
    .formgent-titleBox-media{
        flex: none;
    }
    .formgent-titleBox-text{
        text-align: left;
        position: relative;
        transition: var(--formgent-transition);
        a{
            text-decoration: none;
        }
        .formgent-title{
            font-size: 15px;
            font-weight: 600;
            color: var(--formgent-color-dark);
            transition: var(--formgent-transition);
        }
    }
    .formgent-titleBox-meta{
        display: flex;
        align-items: center;
        gap: 12px;
        margin: 6px 0 0;
        transition: var(--formgent-transition);
        .formgent-titleBox-meta__id{
            position: relative;
            &::after{
                content: '';
                width: 2px;
                height: 2px;
                background: #6e6e6e;
                border-radius: 50%;
                display: block;
                position: absolute;
                inset-inline-end: -7px;
                top: 50%;
                transform: translateY(-50%);
            }
        }
        li{
            font-size: 12px;
            font-weight: 500;
            color: var(--formgent-color-light-gray);
            margin: 0;
        }
    }
    .formgent-form-action{
        display: flex;
        align-items: center;
        gap: 6px;
        position: absolute;
        white-space: nowrap;
        left: 0;
        bottom: -8px;
        margin: 0;
        visibility: hidden;
        opacity: 0;
        transition: var(--formgent-transition);
        .formgent-btn{
            color: var(--formgent-color-dark);
            padding: 5px 12px;
            border-radius: 8px;
            background: var(--formgent-color-gray-200);
            font-size: 13px;
            font-weight: 500;
            &:hover{
                background: var(--formgent-color-primary);
                color: #fff;
            }
        }
        li{
            margin: 0;
        }
    }
`;

const TableStyle = Styled.div`
    .ant-table{
        background-color: transparent;
        &.ant-table-empty{
            .ant-table-container::before{
                content: none;
            }
            .ant-table-cell{
                border-radius: inherit !important;
            }
            thead tr th:first-child{
                border-radius: 12px 0 0 12px !important;
            }
            thead tr th:last-child{
                border-radius: 0 12px 12px 0 !important;
            }
            .ant-table-expanded-row-fixed{
                width: 100% !important;
            }
        }
        table{
            border-spacing: 0 10px;
            tr {
                th,
                td {
                    &:first-child {
                        border-radius: 12px 0 0 12px;
                        padding-inline-start: 15px;
                    }
                    &:last-child {
                        border-radius: 0 12px 12px 0;
                        text-align: right;
                    }
                }
            }
        }
    }
    .ant-checkbox {
        .ant-checkbox-inner:after{
            display: block;
            width: 4.5px;
            height: 8px;
        }
    }
    .ant-table-thead {
        tr{
            th{
                font-size: 12px;
                text-transform: uppercase;
                letter-spacing: 1px;
                font-weight: 500;
                padding: 15px 20px;
                text-align: start;
                color: var(--formgent-color-gray-600);
                background: #f3f4f6;
                &:before{
                    content: none !important;
                }
                &.formgent-form-checkbox{
                    min-width: 350px;
                }
            }
        }
    }
    .ant-table-tbody{
        tr{
            background-color: var(--formgent-color-white);
            box-shadow: 0 1px 2px 0 rgba(16, 24, 40, 0.05);
            border-radius: 12px;
            td{
                border: 1px solid transparent;
                &:first-child{
                    position: relative;
                    border-left: 2px solid transparent;
                    padding-right: 0;
                    transition: var(--formgent-transition);
                }
                &:last-child{
                    padding-right: 21px;
                }
                &.ant-table-selection-column{
                    border-left: 4px solid transparent;
                }
            }
            &:hover{
                td.ant-table-selection-column{
                    border-left: 4px solid var(--formgent-color-primary);
                }
                .formgent-title{
                    color: var(--formgent-color-primary);
                }
                .formgent-form-action{
                    opacity: 1;
                    visibility: visible;
                }
                .formgent-titleBox-meta{
                    opacity: 0;
                    visibility: hidden;
                }
            }

            &.ant-table-row-selected{
                td{
                    border-top: 1px solid #BEE3FF;
                    border-bottom: 1px solid #BEE3FF;
                    background: #EFF8FF !important;
                }
                td:first-child{
                    border-left: 1px solid #BEE3FF;
                }
                td:last-child{
                    border-right: 1px solid #BEE3FF;
                }
            }
        }
    }
    .helpgent-form-date,
    .helpgent-form-username{
        font-size: 13px;
        font-weight: 500;
        color: var(--formgent-color-gray-600);
    }
    .formgent-table-action{
        position: relative;
        &:before{
            content: attr(data-tooltip);
            position: absolute;
            right: 0;
            top: calc(100% + 4px);
            width: 170px;
            padding: 10px;
            background: var(--formgent-color-dark);
            border-radius: 6px;
            font-size: 12px;
            font-weight: 500;
            color: #fff;
            display: none;
            text-align: left;
        }
        &:after{
            content: "";
            position: absolute;
            right: 4px;
            top: calc(100% + 1px);
            transform: translateX(-50%) rotate(45deg);
            width: 9px;
            height: 9px;
            border-radius: 2px;
            background: var(--formgent-color-dark);
            display: none;
        }
        .ant-dropdown-trigger{
            display: flex;
            align-items: center;
            justify-content: flex-end;
        }
        &:hover{
            &:before,
            &:after{
                display: block;
            }
        }
    }
    .formgent-form-shortcode{
        position: relative !important;
        width: 220px;
        svg{
            position: absolute;
            width: 16px;
            height: 16px;
            left: 28px;
            top: 50%;
            margin-top: -6px;
            path{
                stroke: var(--formgent-color-gray-500);
            }
            @media only screen and (max-width: 1399px){
                left: 22px;
            }
        }
        input {
            border: 0 none;
            background: var(--formgent-color-gray-200);
            color: var(--formgent-color-gray);
            border-radius: 5px;
            text-align: center;
            cursor: copy;
            font-size: 12px;
            font-weight: 400;
            padding: 0 3px 0 20px;
            width: 100%;
            box-sizing: border-box;
            &:focus{
                border: 0 none;
                outline: 0;
                box-shadow: none;
            }
        }
        .formgent-form-shortcode__copied{
            svg{
                left: 73px;
                width: 14px;
                height: 14px;
                path{
                    stroke: inherit;
                    fill: var(--formgent-color-gray-500);
                }
            }
        }
        .formgent-form-shortcode__copying{
            display: inline-block;
            position: relative;
            svg{
                left: 50%;
                margin-left: 6px;
                margin-top: 0;
                animation: formgent_spinner 900ms infinite linear forwards;
            }
        }
        label{
            width: 100%;
            display: block;
        }
    }
    .formgent-form-status{
        .formgent-toggle{
            display: flex;
            align-items: center;
            gap: 12px;
        }
    }
    .formgent-head-status{
        width: 185px;
    }
`;
const HeaderStyle = Styled.div`
    .formgent-header-top__content{
        align-items: center;
        gap: 20px;
    }
`;

const TablkSelectionStyle = Styled.div`
    &.formgent-bulk-selection{
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding: 9px 15px;
        border-radius: 12px;
        background-color: #fff;
        margin-top: 30px;
        box-shadow: 0px 1px 3px 0px rgba(16, 24, 40, 0.10), 0px 1px 2px 0px rgba(16, 24, 40, 0.06);
    }
    .formgent-btn-bulk-delete,
    .formgent-btn-bulk-status{
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        padding: 5px 16px;
        font-size: 14px;
        font-weight: 500;
        color: var(--formgent-color-gray-600);
        svg{
            width: 16px;
            height: 16px;
            path{
                stroke: var(--formgent-color-gray-500);
            }
        }
        &:hover{
            background-color: var(--formgent-color-primary);
            svg{
                path{
                    stroke: var(--formgent-color-primary);
                }
            }
        }
    }
    .formgent-btn-bulk-delete{
        margin-right: 12px;
    }
    .formgent-btn-bulk-status{
        margin-right: 8px;
        svg{
            path{
                fill: var(--formgent-color-gray-500);
                stroke: none;
            }
        }
        &:hover{
            svg{
                path{
                    fill: var(--formgent-color-primary);
                    stroke: none;
                }
            }
        }
    }
    .formgent-clear-bulk{
        font-size: 13px;
        font-weight: 500;
        display: inline-block;
        margin-left: 16px;
        color: var(--formgent-color-info);
        transition: 0.3s ease;
        &:hover{
            color: var(--formgent-color-primary);
        }
    }
    .formgent-bulk-selection__text{
        font-size: 13px;
        font-weight: 600;
        color: var(--formgent-color-gray-600);
        padding: 4px 10px;
        border-radius: 6px;
        background: var(--formgent-color-gray-100);
    }
    .formgent-form-bulk-action__more{
        margin-left: 16px;
        position: relative;
        .formgent-form-bulk-action__dropdown{
            position: absolute;
            left: 0;
            top: 100%;
            border: 1px solid #ecedee;
            background: #fff;
            min-width: 140px;
            border-radius: 10px;
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
            list-style: none;
            margin: 0;
            padding: 8px 0;
            display: flex;
            flex-direction: column;
            z-index: 999;
            li{
                margin: 0;
                padding: 0;

            }
            a{
                text-decoration: none;
                display: flex;
                align-items: center;
                gap: 10px;
                font-size: 14px;
                font-weight: 500;
                color: var(--formgent-color-gray);
                padding: 12px 20px;
                transition: var(--formgent-transition);
                &:hover{
                    background: var(--formgent-color-bg-light);
                }
            }
        }
    }
`;

const FormDeleteAlertStyle = Styled.div`
    padding: 0 30px 25px;
    .formgent-conversation-delete__label{
        font-size: 16px;
        font-weight: 500;
        margin: 0;
        color: var(--formgent-color-dark);
        padding: 0;
    }
`;

const FilterStyle = Styled.div`
    margin: 17px 0 7px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .formgent-form-filter__left{
        .ant-select{
            width: 100%;
            height: 40px;
            &.ant-select-focused .ant-select-selector{
                box-shadow: 0 0 0 2px #2C3239 !important;
                border-color: transparent !important;
            }
            .ant-select-selector{
                border-radius: 10px;
            }
            .ant-select-selection-item{
                svg{
                    display: none;
                }
            }
            .ant-select-arrow{
                svg{
                    width: 16px;
                    height: 16px;
                }
            }
        }
    }
    .formgent-form-filter__right{
        display: flex;
        align-items: center;
        gap: 12px;
        .formgent-form-filter__search{
            min-width: 260px;
        }
    }
    .formgent-form-filter__by-time__trigger,
    .formgent-form-filter__sorting__trigger{
        background: #fff;
        border: 1px solid var(--formgent-color-border-light);
        padding: 10px 12px;
        display: flex;
        align-items: center;
        gap: 8px;
        border-radius: 10px;
        cursor: pointer;
        &.ant-dropdown-open{
            box-shadow: 0 0 0 2px #2C3239;
            border-color: transparent;
        }
    }
    .formgent-form-filter__by-time__clear{
        background-color: var(--formgent-color-gray-200);
        font-size: 10px;
        font-weight: 600;
        width: 18px;
        height: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: 0.3s ease;
        svg path{
            transition: 0.3s ease;
        }
        &:hover{
            background-color: var(--formgent-color-danger);
            svg path{
                fill: #fff;
            }
        }
    }
    .formgent-form-filter__sorting__trigger{
        padding: 11px 12px;
        svg{
            width: 16px;
            height: 16px;
        }
    }
    .formgent-form-filter__search{
        .ant-input-affix-wrapper{
            border: 1px solid var(--formgent-color-border-light);
            border-radius: 10px;
            padding: 4px 11px;
            background: #fff;
            &.ant-input-affix-wrapper-focused{
                box-shadow: 0 0 0 2px #2C3239;
                border-color: transparent;
            }
            .ant-input-prefix{
                margin-right: 8px;
            }
            .ant-input{
                border: 0 none;
                outline: 0;
                box-shadow: none;
            }
        }
    }
`;

const StarterContentStyle = Styled.div`
    background: #fff;
    border-radius: 12px;
    box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 100px 0;
    margin-top: 20px;
    .formgent-starter-content__info{
        text-align: center;
        img{
            width: 260px;
            height: auto;
        }
        h2{
            font-size: 16px;
            font-weight: 600;
            color: var(--formgent-color-dark);
            margin: 25px 0 5px;
        }
        p{
            font-size: 14px;
            font-weight: 400;
            color: var(--formgent-color-light-gray);
        }
    }
    .formgent-starter-cards{
        display: flex;
        align-items: center;
        gap: 24px;
        margin-top: 40px;
        margin-bottom: 80px;
    }
    .formgent-starter-card{
        border-radius: 20px;
        width: 220px;
        height: 190px;
        background: var(--formgent-color-gray-100);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        position: relative;
        cursor: pointer;
    }
    .formgent-starter-card--ai{
        background: linear-gradient(233deg, #FFEFF8 0%, #EDD6FF 100%);
    }
    .formgent-starter-card--template{
        background: linear-gradient(233deg, #FFFCED 0.49%, #FFE8DB 100%);
    }
    .formgent-starter-card__icon{
        width: 60px;
        height: 60px;
        border-radius: 12px;
        background: #fff;
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        svg{
            width: 28px;
            height: 28px;
        }
    }
    .formgent-starter-card__title{
        font-size: 16px;
        font-weight: 600;
        color: var(--formgent-color-dark);
        margin: 0;
    }
    .formgent-starter-card__badge{
        position: absolute;
        top: 12px;
        right: 12px;
        background: var(--formgent-color-warning-light);
        color: #853D0E;
        font-size: 11px;
        font-weight: 600;
        text-align: center;
        padding: 3px 6px 4px 6px;
        border-radius: 6px;
    }
`;

export {
	TitleBoxStyle,
	TableStyle,
	HeaderStyle,
	TablkSelectionStyle,
	FormDeleteAlertStyle,
	FilterStyle,
	StarterContentStyle,
};
