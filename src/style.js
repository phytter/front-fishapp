import styled, { css } from 'styled-components';

export const Container = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
`;

export const UploadWrapper = styled.div`
    width: 100%;
    height: 80px;
    padding: 20px;
    display: flex;
    justify-content: flex-end;
    .btn {
        background: #ED5A61;
        border-width: thin;
        border-radius: 3px;
    }
    .btn: hover {
        background: #F17E84;
    }
`;

const drag = css`
  border: 2px solid #009a48;
`;


export const WrapperListImages = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 10px;
    overflow: auto;
    ${prop => prop.drag && drag};

    #first-button {
        margin-right: 10px;
    }
`;

const activeDrop = css`
    border: 2px solid #003D1D;
    background: #E0E0E0;
`;

export const DropArea = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    height: 60%;
    width: 60%;
    margin: auto;
    border: 2px solid #707070;
    ${props => props.isDragging && activeDrop};
    .description {
        color: #707070;
        margin-top: 10px;
    }
`;

export const ImageItem = styled.div`
    width: 100%;
    height: 80px;
    display: flex;
    padding: 5px;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;

    &:hover {
        background-color: #E0E0E0;
    }
`;


export const Title = styled.h1`

`;