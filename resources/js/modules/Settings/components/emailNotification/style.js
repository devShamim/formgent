import Styled from 'styled-components';

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

const DeleteAlertStyle = Styled.div`
    padding: 0 30px 25px;
    .formgent-conversation-delete__label{
        font-size: 16px;
        font-weight: 500;
        margin: 0;
        color: var(--formgent-color-dark);
        padding: 0;
    }
`;

export { TableStyle, DeleteAlertStyle };
