import Styled from 'styled-components';

const TableStyle = Styled.div`
    .ant-table{
        background-color: transparent;
        .ant-table-content {
            overflow-x: auto;
        }
        table{
            tr{
                th,
                td{
                    width: auto;
                    min-width: 215px;
                    border-color: var(--formgent-color-gray-200) !important;
                    &:first-child{
                        width: 40px;
                        min-width: unset;
                        text-align: start;
                        border-right: none !important;
                        padding-inline-end: 12px !important;
                    }
                    &:nth-child(2){
                        width: 57px;
                        min-width: unset;
                        padding-inline-start: 0 !important;
                    }
                    .formgent-form-wrap {
                        display: flex;
                        justify-content: space-between;
                    }
                    .formgent-form-table-item-wrap {
                        display: flex;
                        gap: 12px;
                        align-items: center;
                        font-size: 14px;
                        font-weight: 500;
                        .starred {
                            path {
                                fill: var(--formgent-color-warning);
                                stroke: var(--formgent-color-warning);
                            }
                        }
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
        &:hover {
            .ant-checkbox-inner {
                border-color: var(--formgent-color-info) !important;
            }
        }
        &.ant-checkbox-checked {
            .ant-checkbox-inner {
                background-color: var(--formgent-color-info) !important;
                border-color: var(--formgent-color-info) !important;
            }
        }
    }
    .ant-checkbox-indeterminate .ant-checkbox-inner::after {
        background-color: transparent !important;
    }
    .ant-table-thead{
        tr{
            th{
                font-size: 13px;
                line-height: 20px;
                letter-spacing: 1px;
                font-weight: 600;
                padding: 8px 12px !important;
                min-height: 40px;
                text-align: start;
                color: var(--formgent-color-gray-800);
                background-color: var(--formgent-color-gray-100);
                &:before {
                    height: 100% !important;
                    background-color: var(--formgent-color-gray-400) !important;
                }
                a {
                    color: var(--formgent-color-gray-800);
                }
            }
        }
    }
    .ant-table-tbody{
        tr{
            background-color: var(--formgent-color-white);
            td{
                padding: 8px 12px !important;
                color: var(--formgent-color-gray-600);
                &:first-child{
                    position: relative;
                    padding-right: 0;
                    transition: var(--formgent-transition);
                }
                &:last-child{
                    padding-right: 21px;
                }
            }
            &.ant-table-row-selected{
                border: 1px solid #BEE3FF;
            }
        }
        .ant-table-row.ant-table-row-selected >.ant-table-cell {
            background: var(--formgent-color-info-deep);
        }
    }

    
    .formgent-result-table {
        .ant-table-selection-col {
            width: auto;
        }
        .ant-spin-container {
            min-height: 500px;
            display: flex;
            gap: 30px;
            flex-direction: column;
            justify-content: space-between;
        }
        .ant-table-pagination {
            position: relative;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 0 !important;
            justify-content: center;
            max-width: max-content;
            margin: 0 !important;
            border-radius: 8px !important;
            border: 1px solid var(--formgent-color-gray-300) !important;
            box-shadow: 0 1px 2px 0 rgba(16, 24, 40, 0.05) !important;
            overflow: hidden;
            .ant-pagination-prev,
            .ant-pagination-next,
            .ant-pagination-item {
                height: 40px;
                width: 40px;
                margin: 0 !important;
                border-radius: 0 !important;
                color: var(--formgent-color-gray-600) !important;
                border-right: 1px solid var(--formgent-color-gray-300) !important;
                .ant-pagination-item-link {
                    color: var(--formgent-color-gray-600) !important;
                }
                &:last-child {
                    border-right: none !important;
                }
                &.ant-pagination-item-active {
                    border: none;
                    color: var(--formgent-color-gray-900) !important;  
                    background: var(--formgent-color-gray-200) !important;  
                    a {
                        color: var(--formgent-color-gray-900) !important;  
                    }
                }
                &.ant-pagination-disabled {
                    opacity: .5;
                }
            }
            .ant-pagination-item {
                &:hover {
                    background: var(--formgent-color-gray-200) !important;
                }
            }
        }
    }

    .formgent-column-action {
        display: flex;
        gap: 10px;
        align-items: center;
        justify-content: space-between;
        svg {
            width: 14px;
            height: 14px;
        }

        .formgent-column-action__title {
            display: flex;
            gap: 5px;
            align-items: center;
            font-size: 14px;
            text-transform: capitalize;
        }
        
        .formgent-column-action__icon {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 24px;
            width: 24px;
            min-width: 24px;
            border-radius: 6px;
            color: var(--formgent-color-white);
            background-color: var(--formgent-color-gray-400);
        }
    }

    .formgent-form-date {
        &:hover {
            .response-table__drawer__open {
                opacity: 1;
                visibility: visible;
            }
        }
    }

    .response-table__drawer__open {
        position: absolute;
        right: 12px;
        top: 50%;
        transform: translateY(-50%);
        display: flex;
        gap: 10px;
        align-items: center;
        font-size: 13px;
        font-weight: 500;
        padding: 5px 10px;
        height: 30px;
        margin: 0;
        color: var(--formgent-color-white);
        background: var(--formgent-color-gray-800);
        border: none;
        border-radius: 8px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all ease .3s;
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

const TableSelectionStyle = Styled.div`
    &.formgent-bulk-selection{
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding: 9px 15px;
        border-radius: 12px;
        background-color: #efd9c1;
        margin-top: 30px;
    }
    .formgent-btn-bulk-delete{
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        padding: 5px 16px;
        font-size: 14px;
        font-weight: 500;
        margin: 0 12px;
        color: var(--formgent-color-gray-600);
        &:hover{
            background-color: var(--formgent-color-primary);
            span{
                color: var(--formgent-color-white);
            }
            svg{
                path{
                    fill: var(--formgent-color-white);
                }
            }
        }
        svg{
            width: 16px;
            height: 16px;
            path{
                stroke: var(--formgent-color-gray-500);
            }
        }
    }
    .formgent-clear-bulk{
        font-size: 13px;
        font-weight: 600;
        display: inline-block;
        margin-left: 20px;
        color: #C96C00;
    }
`;

const TableHeaderStyle = Styled.div`
    display: flex;
    gap: 10px;
    margin-bottom: 24px;
`;

const TableActionStyle = Styled.div`
    flex: 1;
    display: flex;
    gap: 10px;
    &:last-child {
        justify-content: end;
    }
    .formgent-table-header__selection {
        display: flex;
        gap: 10px;
        align-items: center;
        .formgent-table-header__selection__text {
            display: flex;
            align-items: center;
            gap: 6px;
            height: 35px;
            padding: 0 15px;
            border-radius: 10px;
            font-size: 12px;
            color: var(--formgent-color-info);
            background: var(--formgent-color-info-deep);
            border: 1px solid var(--formgent-color-info-light);
        }
        .formgent-table-header__selection__all {
            display: flex;
            align-items: center;
            gap: 6px;
            height: 36px;
            padding: 0 12px;
            border-radius: 10px;
            font-size: 14px;
            font-weight: 500;
            background: transparent;
            color: var(--formgent-color-text) !important;
            border: 1px solid var(--formgent-color-bg-light);
            cursor: pointer;
            transition: background ease .3s;
            &:hover {
                background: var(--formgent-color-gray-200) !important;
                border-color: var(--formgent-color-gray-200) !important;
            }
        }
        .formgent-table-header__selection__clear {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 16px;
            height: 16px;
            padding: 0;
            margin: 0;
            border: none;
            outline: none;
            box-shadow: none;
            line-height: 1;
            color: var(--formgent-color-white);
            background: var(--formgent-color-info-light);
            border-radius: 100%;
            cursor: pointer;
            transition: color ease .3s;
            &:hover {
                background: var(--formgent-color-info);
            }
        }
    }
    .formgent-table-header__search {
        width: 275px;
        height: 36px;
        padding: 0 12px;
        box-shadow: none;
        outline: none;
        border-radius: 8px;
        background: transparent;
        border: 1px solid var(--formgent-color-gray-200);
        transition: none;
        &.ant-input-affix-wrapper-focused {
            border: 2px solid var(--formgent-color-gray-800);
        }
        .ant-input {
            outline: none;
            border: none;
            font-size: 14px;
            font-weight: 500;
            color: var(--formgent-color-dark);
            ::placeholder {
                color: var(--formgent-color-gray-400);
                opacity: 1;
            }

            ::-ms-input-placeholder { 
                color: var(--formgent-color-gray-400);
            }
        }
        .ant-input-prefix {
            margin-inline-end: 8px;
        }
        .ant-input-suffix {
            .anticon svg {
                width: 14px;
                height: 14px;
            }
        }
    }
    .ant-btn {
        height: 36px;
        width: 36px;
        background: transparent;
        color: var(--formgent-color-text) !important;
        border: 1px solid var(--formgent-color-bg-light) !important;
        border-radius: 8px;
        &:hover {
            background: var(--formgent-color-gray-200)!important;
            border-color: var(--formgent-color-gray-200)!important;
        }
        &.formgent-table-header__delete {
            color: var(--formgent-color-danger) !important;
            background: var(--formgent-color-danger-light) !important;
            border-color: var(--formgent-color-danger) !important;
            &:hover {
                color: var(--formgent-color-white) !important;
                background: var(--formgent-color-danger) !important;
            }
        }
    }

    .formgent-table-header__dropdown {
        position: relative;
        .formgent-table-header__dropdown__title {
            display: flex;
            align-items: center;
            font-size: 14px;
            font-weight: 600;
            height: 40px;
            padding: 0 15px;
            margin: 0 0 8px;
            color: var(--formgent-color-gray-700);  
            background: var(--formgent-color-gray-100);
        }
        .formgent-table-header__dropdown__toggle {
            display: flex;
            align-items: center;
            gap: 6px;
            height: 36px;
            padding: 0 14px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 500;
            color: var(--formgent-color-text);
            background: var(--formgent-color-bg-white);
            border: 1px solid var(--formgent-color-border-light);
            box-sizing: border-box;
            cursor: pointer;
            span {
                display: flex;
                align-items: center;
                gap: 6px;
            }
            &:hover {
                background: var(--formgent-color-gray-200);
                border-color: var(--formgent-color-gray-200);
            }
        }
        .formgent-table-header__dropdown__content {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            right: 0;
            width: 240px;
            padding: 0 0 15px;
            border-radius: 6px;
            background: var(--formgent-color-bg-white);
            border: 1px solid var(--formgent-color-border-light);
            z-index: 1;
            opacity: 0;
            visibility: hidden;
            overflow: hidden;
            transform: translateY(10px);
            transition: all ease .3s;
        }
        &:hover {
            .formgent-table-header__dropdown__content {
                opacity: 1;
                visibility: visible;
                transform: translateY(0);
            }
        }
    }
    .ant-checkbox-wrapper {
        height: 36px;
        display: flex;
        gap: 12px;
        align-items: center;
        padding: 0 15px;
        font-size: 14px;
        font-weight: 600;
        color: var(--formgent-color-gray-600);
        span {
            padding: 0;
        }
        .ant-checkbox-inner {
            border-radius: 4px;
        }
    }

`;

const TableTabStyle = Styled.div`
    .ant-tabs-nav {
        margin: 0;
        &:before {
            display: none;
        }
    }
    .ant-tabs-nav-list {
        border-radius: 8px;
        border: 1px solid var(--formgent-color-border);
        overflow: hidden;
    }
    .ant-tabs-tab {
        display: flex;
        gap: 8px;
        align-items: center;
        font-size: 14px;
        font-weight: 600;
        height: 36px;
        padding: 0 16px;
        margin: 0 !important;
        text-decoration: none;
        transition: all ease .3s;
        .ant-tabs-tab-btn {
            color: var(--formgent-color-text);
        }
        ~ .ant-tabs-ink-bar {
            display: none;
        }
        &:hover,
        &.ant-tabs-tab-active {
            background-color: var(--formgent-primary-light-button-bg);
            .ant-tabs-tab-btn {
                color: var(--formgent-color-primary);
            }
        }
    }
`;
const TableDrawerStyle = Styled.div`
    width: 600px;
    height: calc(100vh - 98px);
    position: fixed;
    top: 98px;
    right: 0;
    z-index: 9;
    background: #fff;
    overflow-y: auto;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    .response-table__drawer__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 20px;
        border-bottom: 1px solid var(--formgent-color-border-light);
    }
    .response-table__drawer__header__response {
        display: flex;
        gap: 10px;
        align-items: center;
        .response-table__drawer__header__response__btns {
            display: flex;
            gap: 10px;
            align-items: center;
            .response-table__drawer__header__response__btn {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 36px;
                width: 36px;
                font-size: 14px;
                font-weight: 600;
                padding: 0;
                margin: 0;
                background-color: transparent;
                color: var(--formgent-color-dark);
                border: 1px solid var(--formgent-color-border-light);
                border-radius: 8px;
                box-shadow: none;
                outline: none;
                cursor: pointer;
                transition: all ease .3s;
                &:hover {
                    color: var(--formgent-color-white);
                    background: var(--formgent-color-dark);
                    border-color: var(--formgent-color-light-gray);
                }
                &.disabled {
                    opacity: .5;
                    cursor: not-allowed;
                    pointer-events: none;
                    background-color: transparent;
                    color: var(--formgent-color-dark);
                    border: 1px solid var(--formgent-color-border-light);
                }
            }
        }
    }
    .response-table__drawer__header__action {
        display: flex;
        gap: 10px;
        align-items: center;
        .response-table__drawer__header__action__btn {
            height: 36px;
            width: 36px;
            font-size: 14px;
            font-weight: 600;
            padding: 0;
            margin: 0;
            background-color: transparent;
            color: var(--formgent-color-dark);
            border: 1px solid var(--formgent-color-border-light);
            border-radius: 8px;
            box-shadow: none;
            outline: none;
            cursor: pointer;
            transition: all ease .3s;
            &:hover {
                color: var(--formgent-color-white);
                background: var(--formgent-color-light-gray);
                border-color: var(--formgent-color-light-gray);
            }
        }
        .response-table__drawer__close {
            height: 36px;
            width: 36px;
            padding: 0;
            background: var(--formgent-color-bg-general);
            border: none;
            border-radius: 8px;
            cursor: pointer;
            transition: all ease .3s;
            &:hover {
                color: var(--formgent-color-white);
                background: var(--formgent-color-danger);
            }
        }
    }
    .response-table__drawer__content {
        padding: 20px;
    }
    .response-table__drawer__tab {
        padding-bottom: 30px;
    }
    .response-table__drawer__tab__content {
        padding: 24px 0 0;
    }
    .response-table__drawer__tab {
        .response-table__drawer__tab__nav {
            display: flex;
            gap: 0;
        }
    }
    .response-table__drawer__tab__wrapper {
        display: flex;
        gap: 10px;
        flex-direction: column;
        align-items: flex-start;
        border-bottom: 1px solid var(--formgent-color-border);
    }

    .response-table__drawer__tab__item {
        display: flex;
        gap: 12px;
        padding: 20px 0;
        &.response-table__drawer__tab__item--tag {
            .response-table__drawer__tab__item__title {
                height: 40px;
            }
        }
        .response-table__drawer__tab__item__icon {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 40px;
            width: 40px;
            min-width: 40px;
            border-radius: 10px;
            color: var(--formgent-color-gray-700);
            background-color: var(--formgent-color-gray-200);
        }
        .response-table__drawer__tab__item__content {
            display: flex;
            gap: 12px;
            flex-direction: column;
        }
        .response-table__drawer__tab__item__title {
            display: flex;
            align-items: center;
            font-size: 15px;
            font-weight: 600;
            color: var(--formgent-color-dark);
            margin: 0;
        }
        .response-table__drawer__tab__item__desc {
            font-size: 14px;
            font-weight: 400;
            color: var(--formgent-color-light-gray);
            margin: 0;
        }
        .response-table__drawer__tab__item__add {
            display: flex;
            align-items: center;
            background: transparent;
            border: none;
            margin: 0;
            padding: 0;
            cursor: pointer;
            &:hover {
                color: var(--formgent-color-primary);
            }
        }
        .response-table__drawer__tab__item__btns {
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
            .response-table__drawer__tab__item__btn {
                font-size: 14px;
                font-weight: 500;
                padding: 0 8px;
                margin: 0;
                height: 28px;
                color: var(--formgent-color-gray);
                background: var(--formgent-color-border);
                border: none;
                border-radius: 8px;
                cursor: pointer;
                transition: all ease .3s;
                &:hover {
                    color: var(--formgent-color-white);
                    background: var(--formgent-color-light-gray);
                }
            }
        }
    }
    .ant-tabs-tab {
        display: flex;
        gap: 8px;
        align-items: center;
        font-size: 14px;
        font-weight: 600;
        height: 36px;
        padding: 0 36px;
        margin: 0 !important;
        text-decoration: none;
        transition: all ease .3s;
        .ant-tabs-tab-btn {
            color: var(--formgent-color-text);
        }
        ~ .ant-tabs-ink-bar {
            display: none;
        }
        &:hover,
        &.ant-tabs-tab-active {
            background-color: var(--formgent-color-dark);
            .ant-tabs-tab-btn {
                color: var(--formgent-color-white);
            }
        }
    }
    .response-table__drawer__tab__tag {
        display: flex;
        gap: 6px;
        align-items: center;
        flex-wrap: wrap;
        margin: 0;
        .response-table__drawer__tab__tag__item {
            display: flex;
            gap: 5px;
            align-items: center;
            padding: 5px 10px;
            margin: 0;
            border-radius: 8px;
            box-sizing: border-box;
            background-color: var(--formgent-color-bg-light);
            .response-table__drawer__tab__tag__item__single__close {
                display: flex;
                align-items: center;
                font-size: 12px;
                color: var(--formgent-color-dark);
                background: transparent;
                border: none;
                cursor: pointer;
                transition: all ease .3s;
                &:hover {
                    color: var(--formgent-color-danger);
                }
            }
        }
    }

    .response-table__drawer__tab__submission {
        display: flex;
        gap: 16px;
        flex-direction: column;
        margin: 20px 0 0;
        .response-table__drawer__tab__submission__header {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .response-table__drawer__tab__submission__title {
            font-size: 16px;
            font-weight: 600;
            color: var(--formgent-color-dark);
            margin: 0;
        }
        .response-table__drawer__tab__submission__add {
            display: flex;
            gap: 6px;
            align-items: center;
            font-size: 14px;
            font-weight: 600;
            padding: 0 16px;
            margin: 0;
            height: 36px;
            color: var(--formgent-color-white);
            background: var(--formgent-color-gray);
            border: none;
            border-radius: 8px;
            cursor: pointer;
            transition: all ease .3s;
            &:hover {
                background: var(--formgent-color-dark);
            }
            &.cancel {
                color: var(--formgent-color-dark);
                background: var(--formgent-color-border);
                &:hover {
                    color: var(--formgent-color-danger);
                    background: var(--formgent-color-danger-light);
                }
            }
        }
        .response-table__drawer__tab__submission__content {
            display: flex;
            gap: 16px;
            flex-direction: column;
            .response-table__drawer__tab__submission__content__single {
                display: flex;
                gap: 10px;
                .response-table__drawer__tab__submission__content__single__wrapper {
                    display: flex;
                    gap: 10px;
                    flex-direction: column;
                }
                .response-table__drawer__tab__submission__content__btn {
                    font-size: 12px;
                    padding: 0;
                    margin: 0;
                    background: transparent;
                    border: none;
                    cursor: pointer;
                    transition: all ease .3s;
                }
                
                .response-table__drawer__tab__submission__content__published-date {
                    display: flex;
                    gap: 6px;
                    font-size: 12px;
                }
                .response-table__drawer__tab__submission__content__text {
                    font-size: 14px;
                    margin: 0;
                }
            }
            .response-table__drawer__tab__submission__content__wrapper {
                flex: 1;
            }
        }
        .response-table__drawer__tab__submission__note {
            .response-table__drawer__tab__submission__input {
                width: 100%;
                height: 112px;
                padding: 12px 16px;
                border-radius: 12px;
                border: none;
                resize: none;
                box-shadow: none;
                background: var(--formgent-color-border);
            }
            .response-table__drawer__tab__submission__save {
                display: flex;
                gap: 6px;
                align-items: center;
                justify-content: center;
                font-size: 15px;
                font-weight: 600;
                padding: 0 20px;
                margin: 16px 0 0;
                height: 40px;
                color: var(--formgent-color-white);
                background: var(--formgent-color-primary);
                border: none;
                border-radius: 8px;
                cursor: pointer;
                transition: all ease .3s;
                &:hover {
                    background: var(--formgent-color-dark);
                }
                &[disabled] {
                    opacity: .5;
                    cursor: not-allowed;
                    pointer-events: none;
                }
            }
        }
    }

    .response-table__drawer__tab__info {
        display: flex;
        gap: 22px;
        flex-direction: column;
        .response-table__drawer__tab__info__single {
            display: flex;
            gap: 10px;
            .response-table__drawer__tab__info__title {
                font-size: 14px;
                font-weight: 400;
                color: var(--formgent-color-text);
                margin: 0;
                width: 175px;
                min-width: 175px;
            }
            .response-table__drawer__tab__info__value {
                display: flex;
                gap: 5px;
                font-size: 14px;
                font-weight: 500;
                color: var(--formgent-color-gray);
                margin: 0;
            }
        }

        .response-table__drawer__tab__info__tag {
            display: flex;
            gap: 6px;
            align-items: center;
            justify-content: center;
            margin: 0;
            padding: 0 12px;
            height: 26px;
            border-radius: 8px;
            font-size: 12px;
            font-weight: 600;
            color: var(--formgent-color-text);
            background-color: var(--formgent-color-bg-light);
            &.completed {
                background-color: var(--formgent-color-bg-badge-success);
            }
        }
    }
`;

export {
	FormDeleteAlertStyle,
	TableActionStyle,
	TableDrawerStyle,
	TableHeaderStyle,
	TableSelectionStyle,
	TableStyle,
	TableTabStyle,
};
