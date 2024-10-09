import Styled from 'styled-components';

const SummaryStyle = Styled.div`
    padding: 0 12px;
    .formgent-summary-content{
        background: #fff;
        border-radius: 12px;
        display: flex;
        align-items: center;
        flex-direction: column;
        gap: 20px;
        padding: 32px;
    }
    .formgent-summary-item{
        width: 672px;
        background: #fff;
        border-radius: 16px;
        border: 1px solid var(--formgent-color-gray-200);
    }
    .formgent-summary-item__top{
        padding: 20px 24px;
        background: var(--formgent-color-gray-50);
        display: flex;
        align-items: center;
        gap: 12px;
        border-bottom: 1px solid var(--formgent-color-gray-200);
        border-radius: 16px 16px 0 0;
    }
    .formgent-summary-item__top--selection{
        justify-content: space-between;
    }
    .formgent-summary-item__top__left{
        display: flex;
        align-items: center;
        gap: 12px;
    }
    .formgent-summary-item__top__right{
        display: flex;
        align-items: center;
        gap: 8px;
        span{
            font-size: 13px;
            font-weight: 500;
            color: var(--formgent-color-gray-500);
        }
    }
    .formgent-summary-item__icon{
        width: 40px;
        height: 40px;
        border-radius: 10px;
        background: var(--formgent-color-primary-100);
        display: flex;
        align-items: center;
        justify-content: center;
        svg{
            width: 20px;
            height: 20px;
            path{
                stroke: var(--formgent-color-primary);
            }
        }
    }
    .formgent-summary-item--email,
    .formgent-summary-item--text,
    .formgent-summary-item--dropdown,
    .formgent-summary-item--single-choice,
    .formgent-summary-item--input-masking,
    .formgent-summary-item--address{
        .formgent-summary-item__icon{
            svg path{
                stroke: none;
                fill: var(--formgent-color-primary);
            }
        }
    }
    .formgent-summary-item__title{
        h4{
            color: var(--formgent-color-dark);
            font-size: 16px;
            font-weight: 600;
            margin: 0 0 6px;
        }
        span{
            display: block;
            color: var(--formgent-color-gray-500);
            font-size: 12px;
            font-weight: 400;
        }
    }
    .formgent-summary-item__content{
        padding: 0 24px;
        max-height: 220px;
        overflow-y: auto;
        margin: 20px 8px 20px 0;

        //scrollbar style
        scrollbar-width: auto;
        -ms-overflow-style: none;
        scrollbar-behavior: smooth;
        &::-webkit-scrollbar {
            width: 6px;
            height: 43px;
        }
        &::-webkit-scrollbar-track {
            background: var(--formgent-color-gray-200);
            border-radius: 4px;
        }
        &::-webkit-scrollbar-thumb {
            background-color: var(--formgent-color-gray-400);
            border-radius: 4px;
        }
        &::-webkit-scrollbar-thumb:hover {
            background-color: var(--formgent-color-gray-500);
        }
    }
    .formgent-summary-item__content__single{
        font-size: 14px;
        font-weight: 400;
        color: var(--formgent-color-gray-600);
        padding: 20px 0;
        &:not(:last-child){
            border-bottom: 1px solid var(--formgent-color-gray-100);
        }
        &:first-child{
            padding-top: 0;
        }
        &:last-child{
            padding-bottom: 0;
        }
        .ant-progress .ant-progress-inner{
            border-radius: 3px;
            .ant-progress-bg{
                border-radius: 0;
            }
        }
    }
    .formgent-summary-item__content__single__sub-item{
        display: flex;
        align-items: center;
        gap: 24px;
        &:not(:last-child){
            margin-bottom: 8px;
        }
        span{
            color: var(--formgent-color-gray-500);
            font-size: 12px;
            font-weight: 400;
            min-width: 105px;
        }
        strong{
            color: var(--formgent-color-gray-600);
            font-size: 14px;
            font-weight: 500;
        }
    }
    .formgent-summary-item__content__single__label{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 7px;
        .formgent-summary-item-sub-item-label{
            font-size: 14px;
            font-weight: 500;
            color: var(--formgent-color-dark);
        }
        .formgent-summary-item-sub-item-stats{
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            min-width: 150px;
            span{
                display: flex;
                align-items: center;
                gap: 8px;
                font-size: 12px;
                font-weight: 500;
                color: var(--formgent-color-gray-500);
                svg{
                    width: 12px;
                    height: 12px;
                }
            }
            strong{
                font-size: 13px;
                font-weight: 500;
                color: var(--formgent-color-dark);
            }
        }
    }
    .formgent-summary-item__content__not-found{
        padding: 20px 0;
    }
    .formgent-summary-item--dropdown,
    .formgent-summary-item--single-choice,
    .formgent-summary-item--multiple-choice{
        .formgent-summary-item__content__single{
            border: 0 none;
            padding: 0 0 20px 0;
            &:last-child{
                padding-bottom: 0;
            }
        }
    }

    .recharts-responsive-container{
        width: 100%;
        min-height: 210px;
        .recharts-default-legend{
            .recharts-legend-item{
                display: flex !important;
                align-items: center;
                gap: 8px;
            }
            .recharts-legend-item-text{
                font-size: 14px;
                font-weight: 400;
                color: var(--formgent-color-gray-500) !important;
            }
        }
        .recharts-tooltip-wrapper{
            .recharts-tooltip-item-list{
                li:last-child{
                    margin: 0;
                    padding: 0;
                }
            }
        }
    }
`;

export { SummaryStyle };
