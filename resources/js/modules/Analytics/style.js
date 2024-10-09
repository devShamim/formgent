import Styled from 'styled-components';

const AnalyticsStyle = Styled.div`
    padding: 0 12px;
    border-radius: 12px;
    .formgent-analytics-container{
        background: #fff;
        border-radius: 12px;
        padding: 32px;
    }
    .formgent-analytics-container--pro{
        border-radius: 12px 12px 0 0;
    }
    .formgent-analytics-stats__list{
        display: flex;
        align-items: center;
        gap: 16px;
    }
    .formgent-analytics-stats__item{
        flex: 1;
        background: var(--formgent-color-primary-50);
        padding: 24px;
        border-radius: 16px;
        display: flex;
        align-items: center;
        gap: 12px;
    }
    .formgent-analytics-stats__icon{
        width: 48px;
        height: 48px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--formgent-color-primary);
        svg{
            width: 24px;
            height: 24px;
            path{
                fill: #fff;
            }
        }
    }
    .formgent-analytics-stats__content{
        display: flex;
        flex-direction: column;
        gap: 8px;
        span{
            font-size: 14px;
            font-weight: 400;
            color: var(--formgent-color-gray-600);
            display: block;
        }
        strong {
            font-size: 22px;
            font-weight: 600;
            color: var(--formgent-color-dark);
            display: block;
        }
    }
    .formgent-analytics-pro-cta{
        position: relative;
        height: calc(100vh - 260px);
        overflow: hidden;
        border-radius: 0 0 12px 12px;
        &:before{
            position: absolute;
            content: '';
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            background: var(--formgent-color-gray-300);
            opacity: 0.5;
        }
        img{
            width: 100%;
            height: auto;
            object-fit: cover;
        }
    }
    .formgent-analytics-pro-cta__content{
        border-radius: 16px;
        background: #FFF;
        box-shadow: 0px 4px 8px -2px rgba(16, 24, 40, 0.10), 0px 2px 4px -2px rgba(16, 24, 40, 0.06);
        width: 560px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        padding: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }
    .formgent-analytics-pro-cta__icon{
        width: 56px;
        height: 56px;
        border-radius: 10px;
        background: var(--formgent-color-primary-50);
        display: flex;
        align-items: center;
        justify-content: center;
        svg{
            width: 24px;
            height: 24px;
            path{
                stroke: var(--formgent-color-primary);
            }
        }
    }
    .formgent-analytics-pro-cta__title{
        font-size: 22px;
        font-weight: 600;
        color: var(--formgent-color-dark);
        margin-bottom: 12px;
    }
    .formgent-analytics-pro-cta__description{
        font-size: 16px;
        font-weight: 400;
        color: var(--formgent-color-gray-600);
        margin: 0 0 20px;
    }
    .formgent-analytics-pro-cta__btn{
        padding: 12px 20px;
        border-radius: 8px;
        background: #5E53F9;
        color: #FFF;
        font-size: 16px;
        font-weight: 600;
        text-align: center;
        cursor: pointer;
        transition: all 0.3s ease-in-out;
        text-decoration: none;
        &:hover{
            background: var(--formgent-color-primary);
        }
    }
    .formgent-analytics-chart{
        width: 100%;
        margin-top: 56px;
    }
    .formgent-analytics-chart__header{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 30px;
        h2{
            margin: 0;
        }
    }
    .recharts-responsive-container{
        width: 100%;
        min-height: 250px;
    }
    .formgent-analytics-chart__datepicker{
        .ant-picker{
            padding-top: 9px;
            padding-bottom: 9px;
        }
    }
    .formgent-analytics-chart__not-found{
        font-size: 16px;
        text-align: center;
        background: var(--formgent-color-gray-50);
        padding: 35px 0;
        border-radius: 10px;
    }
    .formgent-analytics-question-drop-off{
        margin-top: 56px;
        h2{
            color: var(--formgent-color-dark);
            font-size: 19px;
            font-weight: 600;
            margin: 0 0 20px;
        }
    }
    .formgent-analytics-question-drop-off__table{
        .ant-table-thead {
            tr{
                th{
                    font-size: 14px;
                    font-weight: 500;
                    padding: 15px 20px;
                    text-align: start;
                    color: var(--formgent-color-gray-500);
                    background: var(--formgent-color-gray-50);
                    border-top: 1px solid var(--formgent-color-gray-200);
                    border-bottom: 1px solid var(--formgent-color-gray-200);
                    &:before{
                        content: none !important;
                    }
                    &:first-child{
                        border-left: 1px solid var(--formgent-color-gray-200);
                    }
                    &:last-child{
                        border-right: 1px solid var(--formgent-color-gray-200);
                    }
                }
            }
        }
        .ant-table-tbody{
            .ant-table-cell{
                border-bottom: 1px solid var(--formgent-color-gray-200);
                padding: 15px 20px;
                &:first-child{
                    border-left: 1px solid var(--formgent-color-gray-200);
                }
                &:last-child{
                    border-right: 1px solid var(--formgent-color-gray-200);
                }
            }
            .ant-table-row{
                &:last-child{
                    .ant-table-cell{
                        &:first-child{
                            border-radius: 0 0 0 10px;
                        }
                        &:last-child{
                            border-radius: 0 0 10px 0;
                        }
                    }
                }
            }
        }
    }
    .formgent-analytics-question-drop-off__title{
        display: flex;
        align-items: center;
        gap: 12px;
        span{
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: var(--formgent-color-primary-50);
            svg{
                width: 20px;
                height: 20px;
            }
        }
        h2{
            color: var(--formgent-color-gray-800);
            font-size: 14px;
            font-weight: 500;
            margin: 0;
        }
    }
    .formgent-analytics-question-drop-off__question{
        width: 50%;
    }
    .formgent-analytics-question-drop-off__negative{
        display: inline-flex;
        justify-content: center;
        align-items: center;
        min-width: 68px;
        padding: 4px 8px;
        border-radius: 6px;
        background: #FBE5E5;
        color: #A72E2E;
        font-size: 12px;
        font-weight: 500;
        letter-spacing: 0.12px;
    }
`;

export { AnalyticsStyle };
