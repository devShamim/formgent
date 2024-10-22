import Styled from 'styled-components';

const HookFormHeaderStyle = Styled.div`

`;

const HookFormStyle = Styled.div`
    max-width: 900px;
    .ant-select{
        width: 100%;
    }
`;

const TableBlkSelectionStyle = Styled.div`
    display: flex;
    align-items: center;
    border-radius: 12px;
    padding: 10px 16px;
    box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1);
    border: 1px solid var(--formgent-color-border-gray);
    .ant-btn-default.formgent-btn-bulk-delete{
        display: flex;
        align-items: center;
        font-size: 14px;
        font-weight: 500;
        margin: 0 16px;
        padding: 8px 16px;
        border-radius: 8px;
        border-color: transparent;
        color: var(--formgent-color-danger);
        background-color: #F8D0D0;
        &:hover{
            color: var(--formgent-color-danger);
            border-color: var(--formgent-color-danger);
        }
        svg{
            height: 14px;
            width: 14px;
        }
    }
    .formgent-clear-bulk{
        font-size: 13px;
        font-weight: 500;
        color: var(--formgent-color-info);
    }
`;

export { HookFormHeaderStyle, HookFormStyle, TableBlkSelectionStyle };
