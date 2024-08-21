import Styled from 'styled-components';

const ResultWrapStyle = Styled.div`
    display: flex;
    gap: 10px;
    flex-direction: column;
    padding: 0 12px;
`;

const ResultStyle = Styled.div`
    position: relative;
    min-height: 550px;
    padding: 20px;
    background-color: var(--formgent-color-white);
    border-radius: 10px;
`;

export { ResultStyle, ResultWrapStyle };
